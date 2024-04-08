const DB = require("./db.js");
const { config } = require('dotenv');
const path = require('path');
const fs = require('fs/promises');
const { BlobServiceClient} = require('@azure/storage-blob');

const currentFile = __filename || typeof require !== 'undefined' && require('url').fileURLToPath || '';
const currentDirectory = __dirname || path.dirname(currentFile);
const envPath = path.resolve(currentDirectory, '../.env');
config({ path: envPath });

const dbUrl = process.env.ATLAS_URI;
const db = new DB();

//IMPORTANT: Need to unzip the archive and have it in root of project for this
async function init_questions_db(){
  await db.clearTarotCards();

  const result = await fs.readFile("../../archive/tarot-images.json");
  const json = JSON.parse(result);
  const images_path = '../../archive/cards';
  const images_paths = await get_card_images(images_path);

  for (let i = 0; i < json.cards.length; i++){
    const description = json.cards[i].fortune_telling[0];
    await db.insertTarotCard({"name": json.cards[i].name, "number": Number(json.cards[i].number), "arcana": json.cards[i].arcana, "suit": json.cards[i].suit, description, image: images_paths[i]});
  }

  console.log("Insert data complete.");
}

async function get_card_images(images_path) {
  const images = [];
  try {
    // Files of directory in array
    const files = await fs.readdir(images_path);

    for( const file of files ) {
      //Get full path
      const fromPath = path.join( images_path, file );

      console.log( "Adding '%s' as image", fromPath );
      const image =  await fs.readFile(fromPath);
      const imageName = path.basename(fromPath);

      const imageUrl = await postImage(image, imageName);
      images.push(imageUrl);
    } 
  }
  catch( e ) {
    console.log( "ERROR:", e );
  }
  return images;
}

async function postImage(file, fileName) {
  const sasToken = process.env.AZURE_SAS;
  const containerName = 'dreamscape';
  const storageAccountName = process.env.storagereousrcename || "azuretest2135666";
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );
  const containerClient = blobService.getContainerClient(containerName);

  if (file) {
    const blobName = fileName
    const blobClient = containerClient.getBlockBlobClient(blobName);

    //Set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: 'image/jpeg' } };
    //Upload image to blob storage account in azure
    await blobClient.uploadData(file, options);

    //Store name & uri into mongodb
    return containerClient.getBlockBlobClient(blobName).url;
  }
}


db.connect(dbUrl).then( ()=> init_questions_db() );
setTimeout(db.close, 15000);