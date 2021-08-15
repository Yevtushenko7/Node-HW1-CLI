const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');
const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
} catch (error) {
    throw error.message;
}
}


async function getContactById(contactId) {
  try {
      const contacts = await listContacts();
      const foundContact = contacts.find((contact) => contact.id === +contactId);
      if (!foundContact) {
      throw new Error(`Contact with id=${contactId} not found`);
      }
      return foundContact;
  } catch (error) {
      throw error.message;
  }
}


async function removeContact(contactId) {
  try {
    const contacts = await listContacts();

    const filteredContacts = contacts.filter(
      (contact) => contact.id !== Number(contactId)
    );

    const newContactsList = JSON.stringify(filteredContacts);
    await fs.writeFile(contactsPath, newContactsList);

    return filteredContacts;
  } catch (error) {
   throw error.message;
  }
}



async function addContact(name, email, phone) {
  try {
      const contacts = await listContacts();
      const id = shortid.generate()
      const newContact = { name, email, phone, id };
      await contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));

      return newContact;
  } catch (error) {
      throw error.message;
  }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}