import { Contact } from "baileys";
import { logger } from "../../utils/logger";
import fs from "fs";
import path from "path";

class ContactStore {
  private contacts: Map<string, Contact>;
  private filePath: string;

  constructor(authPath: string) {
    this.contacts = new Map();
    this.filePath = path.join(authPath, "contacts.json");

    this.loadContacts();
  }

  private loadContacts() {
    try {
      if (fs.existsSync(this.filePath)) {
        const data = fs.readFileSync(this.filePath, "utf-8");
        const parsedContacts: Contact[] = JSON.parse(data);
        parsedContacts.forEach((contact) => this.contacts.set(contact.id, contact));
        logger.info(`📂 Contatos carregados do arquivo: ${this.filePath}`);
      }
    } catch (error) {
      logger.error(`❌ Erro ao carregar contatos: ${(error as Error).message}`);
    }
  }

  private saveContacts() {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(Array.from(this.contacts.values()), null, 2));
      logger.info(`📁 Contatos salvos no arquivo: ${this.filePath}`);
    } catch (error) {
      logger.error(`❌ Erro ao salvar contatos: ${(error as Error).message}`);
    }
  }

  addContact(contact: Contact) {
    this.contacts.set(contact.id, contact);
    this.saveContacts(); // Salvar no arquivo
  }

  getContact(jid: string): Contact | undefined {
    return this.contacts.get(jid);
  }

  getAllContacts(): Contact[] {
    return Array.from(this.contacts.values());
  }
}

export default ContactStore;
