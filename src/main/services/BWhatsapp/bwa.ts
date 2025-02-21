import { makeWASocket, BaileysEventMap, fetchLatestBaileysVersion, useMultiFileAuthState, UserFacingSocketConfig, WASocket, DisconnectReason } from "baileys";
import fs from "fs";
import AppError from "../../errors/AppError";
import { logger, loggerBaileys } from "../../utils/logger";
import { v4 as uuidv4 } from "uuid";
import { Boom } from "@hapi/boom";
import { mainWindow } from "../..";

export interface Session extends WASocket {
  id: string;
  qrCode?: string;
  status?: string;
}

class BWhatsapp {
  private static instances: Map<string, BWhatsapp> = new Map();
  private static sessions: Map<string, Session> = new Map();

  private sessionId: string;
  private socketConfig?: UserFacingSocketConfig;

  // Construtor modificado para criar e armazenar instâncias
  public constructor(sessionId?: string, socketConfig?: UserFacingSocketConfig) {
    this.sessionId = sessionId || uuidv4();
    this.socketConfig = socketConfig;

    // Se a instância não existir, cria e armazena uma nova instância
    if (!BWhatsapp.instances.has(this.sessionId)) {
      BWhatsapp.instances.set(this.sessionId, this);
      logger.info(`🆕 New instance created for session ${this.sessionId}`);
    } else {
      throw new AppError(`⚠️ Instance already exists for session ${this.sessionId}`);
    }
  }

  public static getInstance(sessionId: string): BWhatsapp | null {
    return BWhatsapp.instances.get(sessionId) ?? null;
  }

  public static listSessions(): { id: string; qrCode?: string }[] {
    return Array.from(BWhatsapp.sessions.values()).map(session => ({
      id: session.id,
      qrCode: session.qrCode,
      status: session.status
    }));
  }

  public static async startStoredSessions(handler?: (events: Partial<BaileysEventMap>, session: BWhatsapp) => void | Promise<void>): Promise<void> {
    const authsPath = ".auth";
    logger.info("📂 Loading stored sessions...");
    try {
      const files = fs.readdirSync(authsPath, { withFileTypes: true });
      const directories = files.filter(file => file.isDirectory()).map(dirent => dirent.name);

      const startPromises = directories.map(dirname => {
        const instance = new BWhatsapp(dirname);
        return instance.initSocket(handler);
      });

      await Promise.all(startPromises);
      logger.info("✅ All sessions started successfully.");
    } catch (err) {
      logger.error(`❌ Failed to start sessions. Error: ${(err as Error).message}`);
    }
  }

  public async initSocket(handler?: (events: Partial<BaileysEventMap>, session: BWhatsapp) => void | Promise<void>): Promise<Session> {
    return new Promise((resolve, reject) => {
      try {
        (async () => {
          logger.info("🔄 Connecting to WhatsApp...");

          logger.info(`🔐 Session auth credentials stored at ${this.getAuthPath()}`);
          const { state } = await useMultiFileAuthState(this.getAuthPath());
          const { version, isLatest } = await fetchLatestBaileysVersion();

          const socketConfig: UserFacingSocketConfig = {
            printQRInTerminal: false,
            auth: state,
            version: version,
            logger: loggerBaileys,
            ...this.socketConfig
          };

          const socket: Session = {
            id: this.sessionId,
            ...makeWASocket(socketConfig)
          };

          logger.info(`🚀 Session ${this.sessionId} started (WA v${version.join('.')}, latest: ${isLatest})`);
          mainWindow.webContents.send('session-update', { id: socket.id, status: socket.status || "initializing", qrCode: socket.qrCode });

          if (!BWhatsapp.sessions.has(this.sessionId)) {
            BWhatsapp.sessions.set(this.sessionId, socket);
          }
          logger.info(`🔌 Socket initialized successfully for session ${socket.id}`);
          resolve(socket);
          this.initMonitor(handler);
        })();
      } catch (err) {
        logger.error(`❌ Connection error: ${(err as Error).message}`);
        reject(err);
      }
    });
  };

  private async initMonitor(handler?: (events: Partial<BaileysEventMap>, session: BWhatsapp) => void | Promise<void>) {
    const socket = this.getSocket();
    if (socket) {
      const { saveCreds } = await useMultiFileAuthState(this.getAuthPath());
      socket.ev.process(async (events) => {
        if (events["connection.update"]) {
          const { connection, lastDisconnect, qr } = events["connection.update"];
          const disconnect = lastDisconnect ? (lastDisconnect.error as Boom).output.statusCode : undefined;
          switch (connection) {
            case "connecting":
              logger.info(`🔄 Connecting session ${this.sessionId}...`);
              socket.qrCode = "";
              socket.status = "connecting";
              break;

            case "open":
              logger.info(`✅ Session ${this.sessionId} connected successfully!`);
              socket.qrCode = "";
              socket.status = "open";
              break;

            case "close":
              logger.warn(`🔴 Session ${this.sessionId} disconnected. Error code: ${disconnect}`);
              socket.qrCode = "";
              socket.status = "closed";
              if (disconnect === DisconnectReason.loggedOut) {
                logger.error(`⚠️ Session ${this.sessionId} expired. Removing credentials.`);
                BWhatsapp.sessions.delete(this.sessionId);
              }
              break;
          }
          if (qr) {
            logger.info(`🆗 Session ${this.sessionId} QRCode generated`);
            socket.qrCode = qr;
            socket.status = "qrcode";
          }
          mainWindow.webContents.send('session-update', {
            id: socket.id,
            status: socket.status || "closed",
            qrCode: socket.qrCode
          });
        }
        if (events["creds.update"]) {
          logger.info("🔐 Auth credentials updated");
          saveCreds();
        }
        if (handler) {
          handler(events, this);
        };

      });
    } else {
      logger.error(`❌ Error starting monitoring: Socket not found for ${this.sessionId}`);
    };
  };

  public getSocket(): Session {
    const session = BWhatsapp.sessions.get(this.sessionId);
    if (!session) {
      throw new AppError(`❌ Inexistent session Id "${this.sessionId}"`);
    };
    return session;
  };

  public removeSocket(clearAuth: boolean): void {
    try {
      if (BWhatsapp.sessions.has(this.sessionId)) {
        const session = BWhatsapp.sessions.get(this.sessionId)!;
        session.logout(); // Presumindo que logout é uma operação síncrona
        session.ws.close();
        BWhatsapp.sessions.delete(this.sessionId);
        logger.warn(`❌ Clearing session ${this.sessionId} from memory`);
      };
      if (clearAuth) {
        try {
          fs.accessSync(this.getAuthPath()); // Verifica se o caminho existe
          logger.info(`❌ Clearing auth data from session "${this.sessionId}"`);
          fs.rmSync(this.getAuthPath(), { recursive: true });
        } catch (err) {
          if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
            logger.warn(`🔒 Auth credentials not found for session "${this.sessionId}"`);
          } else {
            logger.warn(`❌ Error accessing or removing auth path. Err: ${(err as Error).message}`);
          };
        };
      } else {
        throw new AppError("Session not found", 404);
      };
    } catch (err) {
      throw new AppError((err as Error).message);
    };
  };

  public getAuthPath = () => `.auth/${this.sessionId}`;

  public static getAuthPathBySessionId = (sessionId:string) => `.auth/${sessionId}`;
}

export default BWhatsapp;
