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
  get_card_images();

  for(const card of json.cards){
    await db.insertTarotCard({"name": card.name, "number": Number(card.number), "arcana": card.arcana, "suit": card.suit, "description": "Temp", image: "Temp"});
  }

  console.log("Insert data complete.");
}

async function get_card_images() {
  const images = [];
  const images_path = '../../archive';
  // Our starting point
  try {
    // Get the files as an array
    const files = await fs.promises.readdir(images_path);

    // Loop them all with the new for...of
    for( const file of files ) {
      // Get the full paths
      const fromPath = path.join( images_path, file );

      // Stat the file to see if we have a file or dir
      const stat = await fs.promises.stat( images_path );

      if( stat.isFile() ) {
          console.log( "'%s' is a file.", fromPath );
          const imageUrl = await fetch('/api/v1/images/new', {
            method : 'POST',
            headers : {
            },
              body: stat
          }).then(data => data.json())
          images.push(imageUrl);
      }
      else if( stat.isDirectory() )
          console.log( "'%s' is a directory.", fromPath );
    } 
  }
  catch( e ) {
    // Catch anything bad that happens
    console.error( "We've thrown! Whoops!", e );
  }
}

db.connect(dbUrl).then( ()=> init_questions_db() );
setTimeout(db.close, 3000);