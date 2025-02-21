import pino from "pino";
import baileysPino from "baileys/node_modules/pino";
import type { Logger as LoggerBaileys } from "baileys/node_modules/pino"; // 🔥 Usa a versão do Baileys
import pretty from "pino-pretty";
import fs from "fs";
import path from "path";

// Define o caminho do diretório e do arquivo de logs
const logDir = "logs";
const logFilePath = path.join(logDir, "errors.log");

// Garante que o diretório 'logs' exista antes de criar o stream de logs
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Cria um stream para salvar **apenas erros** no arquivo
const errorStream = pino.destination(logFilePath);

// Logger principal
const logger = pino(
  { level: "info" },
  pino.multistream([
    { stream: pretty({ ignore: "pid,hostname" }) }, // Exibe logs bonitos no console
    { level: "error", stream: errorStream } // Salva apenas erros no arquivo
  ])
);

// Logger do Baileys (apenas erros), salvando no arquivo
const loggerBaileys: LoggerBaileys = baileysPino(
  { level: "error" },
  errorStream
); // Apenas erros serão salvos

export { logger, loggerBaileys };
