// *** TODO Azure package does not want to install, test once that is figured out
const express = require('express');
const router = express.Router();
const DB = require("../database/db.js");
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
// const { BlobServiceClient} = require('@azure/storage-blob');

const db = new DB();

// const sasToken = process.env.AZURE_SAS;
// const containerName = 'helloblob';
// const storageAccountName = process.env.storagereousrcename || "azuretest2135666";
// const blobService = new BlobServiceClient(
//   `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
// );
// const containerClient = blobService.getContainerClient(containerName);

router.use( fileUpload({ createParentPath: true, }) );

//Gets the profile of a user for when they login
router.get('/:email', getProfile);
async function getProfile(req, res) {
  res.type('json');
  const profile = await db.getProfile( req.params.email );
  if(profile){
    return res.json( {"profile": profile});
  }
  else{
    return res.status(404).send({status: '404', message: "Profile not found"});
  }
}

//Create a profile for a user when they sign up
router.post('/new', createProfile);
async function createProfile(req, res) {
  const { email, password, firstname, lastname } = req.body;
  const emailPattern = /^([A-z]|[0-9]|\.|-)+@[a-z]+(\.[a-z]+)+$/g;
  if (email.match(emailPattern) && password && firstname && lastname) {
    db.insertProfile({ "email": email, "password": password, "firstName": firstname, "lastName": lastname });
    const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), email: email}, password);
    //Create session using email as unique identifier
    req.session.regenerate(function(err) {
      if (err) {
        return res.sendStatus(500); //server error, couldn't create the session
      }
      //store the user's info in the session
      req.session.user = email;
    });
    return res.json((JSON.stringify({"email": email, "token": token })));
  }
  return res.status(401).json({ status: 401, message: 'Profile missing information' });
  
}

// TODO fix this route to upload images, azure package does not install
// router.post('/picture', postImage);
// async function postImage(req, res) {
//   const username = req.body;
//   if (username && req.files) {
//     const file = req.files.file;
//     const blobName = file.name;
//     const blobClient = containerClient.getBlockBlobClient(blobName);

//     //Set mimetype as determined from browser with file upload control
//     const options = { blobHTTPHeaders: { blobContentType: file.mimetype } };
//     //Upload image to blob storage account in azure
//     await blobClient.uploadData(file.data, options);

//     //Store name & uri into mongodb
//     db.insertImage(username.email, containerClient.getBlockBlobClient(blobName).url);

//     return res.status(200).send({ status: 200, message: 'Succesful' });
//   }
//   return res.status(403).send({status: 403, message: 'Wrong format'})
// }


module.exports = {"profileRouter": router};