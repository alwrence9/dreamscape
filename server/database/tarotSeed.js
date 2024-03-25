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
  console.log("HEre!")
  const images = [];
  try {
    // Files of directory in array
    const files = await fs.readdir(images_path);

    for( const file of files ) {
      // Get the full paths
      const fromPath = path.join( images_path, file );

      // To check if files are a directory
      //const stat = await fs.stat( images_path );

      //if( stat.isFile() ) {
          console.log( "'%s' is a file.", fromPath );
          // const resp = await fetch('localhost:3000/api/v1/images/new', {
          //   method : 'POST',
          //   headers : {
          //   },
          //     body: stat
          // })
          // if (resp.ok) {
          //   const imageUrl = await resp.json()
          //   images.push(imageUrl);
          // }
          const image =  await fs.readFile(fromPath);
          const splitPath = fromPath.split("\\");
          const imageName = splitPath[splitPath.length-1]
          const imageUrl = await postImage(image, imageName);
          images.push(imageUrl);
        //}
    } 
  }
  catch( e ) {
    console.log( "ERROR:", e );
  }
  return images;
}

const sasToken = process.env.AZURE_SAS;
const containerName = 'dreamscape';
const storageAccountName = process.env.storagereousrcename || "azuretest2135666";
const blobService = new BlobServiceClient(
  `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
);
const containerClient = blobService.getContainerClient(containerName);

async function postImage(file, fileName) {
  if (file) {
    const blobName = fileName
    const blobClient = containerClient.getBlockBlobClient(blobName);

    //Set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: 'image/jpeg' } };
    //Upload image to blob storage account in azure
    await blobClient.uploadData(file, options);

    //Store name & uri into mongodb
    return JSON.stringify(containerClient.getBlockBlobClient(blobName).url);

    //return res.status(200).send({ status: 200, message: 'Succesful' });
  }
}


db.connect(dbUrl).then( ()=> init_questions_db() );
setTimeout(db.close, 3000);