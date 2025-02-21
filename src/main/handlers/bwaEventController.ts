import { BaileysEventMap, Contact } from "baileys";
import { logger } from "../utils/logger";
import ContactStore from "../services/BWhatsapp/contactStore";
import BWhatsapp from "../services/BWhatsapp/bwa";
import AppError from "../errors/AppError";


async function bwaEventHandler(events: Partial<BaileysEventMap>, session:BWhatsapp): Promise<void> {
  const contactStore = new ContactStore(session.getAuthPath()); // Criando uma instância do ContactStore
  //const socket = session.getSocket();

  try {
    if (events["contacts.update"]) {
      for (const contact of events["contacts.update"]) {
        if (contact.id) {
          contactStore.addContact(contact as Contact);
          logger.info(`📥 Contact updated: ${contact.id}`);
        }
      }
    }
    if (events['contacts.upsert']){
      for (const contact of events["contacts.upsert"]) {
        if (contact.id) {
          contactStore.addContact(contact as Contact);
          logger.info(`📥 Contact updated: ${contact.id}`);
        }
      }
    }
    // if (events['messages.upsert']){
    //  for (const message of events['messages.upsert'].messages){
    //    logger.info(`📨 Mensagem recebida: ${message.message}`);
    //  }
    // }

    // if (events["chats.update"]) {
    //  logger.info(`📨 Chats atualizados: ${events["chats.update"].length}`);
    // }

  } catch (error) {
    throw new AppError(`❌ Baileys event error: ${(error as Error).message}`);
  }
}

export default bwaEventHandler;
