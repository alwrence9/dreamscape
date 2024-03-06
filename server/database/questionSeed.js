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
  await db.clearChronotypeQuestion();
  await db.clearInsomniaQuestion();

  const result = await fs.readFile("./database/questions.json");
  const json = JSON.parse(result);

  for (const question of json.questions){
    if(question.type === "Chronotypes"){
      db.insertChronotypeQuestion( {"question": question.question, "lion": question.choices.Lion, "dolphin": question.choices.Dolphin, "bear": question.choices.Bear, "wolf": question.choices.Wolf} );
    }
    else if(question.type === "Insomnia"){
      db.insertInsomniaQuestion( {"question": question.question, "episodic": question.choices.Episodic, "persistent": question.choices.Persistent, "recurrent": question.choices.Recurrent} );
    }
  }

  console.log("Insert data complete.");
}

db.connect(dbUrl).then( ()=> init_questions_db() );
setTimeout(db.close, 3000);