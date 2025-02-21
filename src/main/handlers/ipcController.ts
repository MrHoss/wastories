import { ipcMain } from "electron";
import videoSplitter from "../services/Videos/videoSplitter";
import BWhatsapp from "../services/BWhatsapp/bwa";
import bwaEventHandler from "./bwaEventController";
//import { logger } from "../utils/logger";

function ipcController(): void {
  ipcMain.handle('upload-video-and-split', async (_, videoPath: string, sessionId:string) => videoSplitter(videoPath, sessionId));
  ipcMain.handle('list-sessions', async () => BWhatsapp.listSessions());
  ipcMain.handle('create-session', async () => {
    const session = new BWhatsapp();
    session.initSocket(bwaEventHandler);
  });
  ipcMain.handle('remove-session', async (_, sessionId: string) => {
    const session = BWhatsapp.getInstance(sessionId);
    if (session) {
      session.removeSocket(true);
    }
  });
}
export default ipcController;