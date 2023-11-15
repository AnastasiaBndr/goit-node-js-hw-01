const fs = require("fs").promises;
const argv = require("yargs").argv;
const path = require("node:path");

var content;

const contsctsPath = path.resolve("./src/db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contsctsPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contsctsPath, "utf8");
    return JSON.parse(data).filter((el) => el.id === contactId);
  } catch (err) {
    return null;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contsctsPath, "utf8");
    const deleted = JSON.parse(data).filter((el) => el.id === contactId);
    const newArr = JSON.parse(data).filter((el) => el.id != contactId);
    fs.writeFile(contsctsPath, JSON.stringify(newArr), (err) => {
      if (err) console.log(err);
    });
    return deleted;
  } catch (err) {
    return err;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contsctsPath, "utf8");
    const obj = { id: makeid(), name: name, email: email, phone: phone };
    const newArr = JSON.parse(data);
    newArr.push(obj);
    fs.writeFile(contsctsPath, JSON.stringify(newArr), (err) => {
      if (err) console.log(err);
    });
    return obj;
  } catch (err) {
    return err;
  }
}

function makeid() {
  let result = "";
  const characters = "_-abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = "qdggE76Jtbfd9eWJHrssH".length;
  let counter = 0;
  while (counter < charactersLength) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      console.log(await listContacts());
      break;

    case "get":
      console.log(await getContactById(id));
      break;

    case "add":
      console.log(await addContact(name, email, phone));
      break;

    case "remove":
      console.log(await removeContact(id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
