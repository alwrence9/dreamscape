const DB = require("./db.js");
const { config } = require('dotenv');
const path = require('path');
const SHA256 = require('crypto-js/sha256');

const currentFile = __filename || typeof require !== 'undefined' && require('url').fileURLToPath || '';
const currentDirectory = __dirname || path.dirname(currentFile);
const envPath = path.resolve(currentDirectory, '../.env');
config({ path: envPath });

const dbUrl = process.env.ATLAS_URI;
const db = new DB();

async function init_db(){
  await db.clearProfiles();
  await db.clearJournals();
  await db.clearSleepLogs();
  await db.clearSPD();

  await db.insertProfile(
    {
      "email": "chadrew.brodzay@gmail.com",
      "password": SHA256("bestest").toString(),
      "firstName": "Chadrew",
      "lastName": "Brodzay"
    }
  );

  await db.insertDreamJournal(
    {
      "email": "chadrew.brodzay@gmail.com",
      "date": { "string": "2-26-2024", "sinceEpoch": 1708923600000 },
      "title": "Class was cancelled",
      "description": "Class was cancelled, but I showed up anyways. 😎"
    }
  );

  await db.insertDreamJournal(
    {
      "email": "chadrew.brodzay@gmail.com",
      "date": { "string": "2-27-2024", "sinceEpoch": 1709010000000 },
      "title": "Haunting Students",
      "description": "My students keep sending me soup pictures and the Key to the Misty Mountain."
    }
  );

  await db.insertSleepLog(
    {
      "email": "chadrew.brodzay@gmail.com",
      "date": { "string": "2-26-2024", "sinceEpoch": 1708923600000 },
      "hoursSlept": 10,
      "notes": "I woke up at 1:00 because of a dream where my students worship me."
    }
  );

  await db.insertSleepLog(
    {
      "email": "chadrew.brodzay@gmail.com",
      "date": { "string": "2-27-2024", "sinceEpoch": 1709010000000 },
      "hoursSlept": 10,
      "notes": "I woke up at 1:00 because of the Key to the Misty Mountain."
    }
  );

  await db.insertSPD(
    {
      "name": "Brist O'pher", 
      "dangerLVL": 5, 
      "description":
      'This SPD is highly dangerous and can be seen during the late stages of a semester when projects are due. It appears as wearing a cap, a dark blue long-sleeve shirt and a pair of jeans. SPD Bureau Research Teams have attempted to communicate with it, but concluded that it does not respond to any form of communication or external stimuli. This has led the science teams to believe that the specimen is completely disconnected from the physical world. The specimen primary mode of transportation can only be explained as teleportation. It remains entirely immobile and relocates itself only through humanoid-shaped objects. This discovery has allowed research teams to extend the length of its apparition by allowing it possess a mannequin. This is when the only picture of the specimen was taken by the SPD Bureau.'
    }
  );

  await db.insertSPD(
    {
      "name": "Poul", 
      "dangerLVL": 2, 
      "description":
      'This SPD is not hostile during the first stages of an apparition. The specimen remains in areas of low visibility, resorting to small acts of mischief like poking protruding arms of legs from the bedside. If the specimen is provoked, it will correct every mistake made by the victim throughout the night. Multiple victims have heard it recite scientific information without end, causing brain tissue necrosis after prolongued exposure.'
    }
  );

  console.log("Insert data complete.");
}

db.connect(dbUrl).then( ()=> init_db() );
setTimeout(db.close, 3000);