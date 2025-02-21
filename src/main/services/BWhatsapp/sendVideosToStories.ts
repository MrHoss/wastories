import { WAMediaUpload } from "baileys";
import fs from "fs";
import BWhatsapp, { Session } from "./bwa";
import { logger } from "../../utils/logger";
import ContactStore from "./contactStore";

export default async function sendVideosToStories(socket: Session, videoPaths: string[]) {
  try {
    for (const videoPath of videoPaths) {
      const videoBuffer = fs.readFileSync(videoPath); // Lê o vídeo como Buffer
      const myJid = socket.user?.id.split("@")[0];
      if (myJid) {
        const authPath = BWhatsapp.getAuthPathBySessionId(socket.id);
        const contactsList = new ContactStore(authPath).getAllContacts();
        const contactJids:string[] = contactsList.map((contact):string => contact.id);
        await socket.sendMessage("status@broadcast", {
          video: videoBuffer as WAMediaUpload,
          caption: "📹 Vídeo enviado automaticamente!", // Legenda opcional
          mimetype: "video/mp4"
        }, {
          statusJidList: contactJids,
          broadcast: true,
        });
        logger.info(`✅ Vídeo enviado: ${videoPath}`);
      }else{
        logger.error(`❌ Erro ao enviar vídeos para os stories. Erro: Cannot get connection jid: '${myJid}'.`);
      }
    }
  } catch (error) {
    logger.error(`❌ Erro ao enviar vídeos para os stories. Error: ${(error as Error).message}`);
  }
}
