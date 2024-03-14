const DB = require("./db.js");
const { config } = require('dotenv');
const path = require('path');
const fs = require('fs/promises');

const currentFile = __filename || typeof require !== 'undefined' && require('url').fileURLToPath || '';
const currentDirectory = __dirname || path.dirname(currentFile);
const envPath = path.resolve(currentDirectory, '../.env');
config({ path: envPath });

const dbUrl = process.env.ATLAS_URI;
const db = new DB();

async function init_questions_db(){
  await db.clearTarotCards();

  const result = await fs.readFile("./database/tarot-images.json");
  const json = JSON.parse(result);

  for(const card of json.cards){
    await db.insertTarotCard({"name": card.name, "number": Number(card.number), "arcana": card.arcana, "suit": card.suit, "description": "Temp", image: "Temp"});
  }

  console.log("Insert data complete.");
}

db.connect(dbUrl).then( ()=> init_questions_db() );
setTimeout(db.close, 3000);