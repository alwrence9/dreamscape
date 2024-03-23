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

  const result = await fs.readFile("../../archive/tarot-images.json");
  const json = JSON.parse(result);
  const images_path = '../../archive/cards';
  get_card_images(images_path);

  for(const card of json.cards){
    await db.insertTarotCard({"name": card.name, "number": Number(card.number), "arcana": card.arcana, "suit": card.suit, "description": "Temp", image: "Temp"});
  }

  console.log("Insert data complete.");
}

async function get_card_images(images_path) {
  const images = [];
  try {
    // Files of directory in array
    const files = await fs.readdir(images_path);

    for( const file of files ) {
      // Get the full paths
      const fromPath = path.join( images_path, file );

      // To check if files are a directory
      const stat = await fs.stat( images_path );

      if( stat.isFile() ) {
          console.log( "'%s' is a file.", fromPath );
          const resp = await fetch('/api/v1/images/new', {
            method : 'POST',
            headers : {
            },
              body: stat
          })
          if (resp.ok) {
            const imageUrl = await resp.json()
            images.push(imageUrl);
          }
        }
    } 
  }
  catch( e ) {
    console.log( "ERROR:", e );
  }
  return images;
}

db.connect(dbUrl).then( ()=> init_questions_db() );
setTimeout(db.close, 3000);