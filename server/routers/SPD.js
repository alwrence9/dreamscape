const express = require('express');
const router = express.Router();
const DB = require("../database/db.js");

const db = new DB();

//Gets the SPD entries
router.get('/', getSPDentries);
async function getSPDentries(req, res) {
  res.type('json');
  const entries = await db.getAllSPD();
  if(entries){
    return res.json( {"SPDentries": entries});
  }
  else{
    return res.status(404).send({status: '404', message: "SPD entries not found"});
  }
}

//Gets an SPD entry by the ID allocated by Mongo
router.get('/:id', getSPD);
async function getSPD(req, res) {
  res.type('json');
  const entries = await db.getSPD(req.params.id);
  if(entries){
    return res.json( {"SPDentries": entries});
  }
  else{
    return res.status(404).send({status: '404', message: "SPD entries not found"});
  }
}

//Insert new SPD entry
router.post('/new', createSPD);
async function createSPD(req, res) {
  const { name, level, optionalDescription, coordinates } = req.body;
  let description
  if(!optionalDescription){
    description = "nothing";
  }
  else{
    description = optionalDescription;
  }
  if (name && level && coordinates) {
    db.insertSPD({
      "name": name, 
      "dangerLVL": level, 
      "description": description,
      "coordinates": coordinates
    });
    return res.status(201).json({ status: 201, message: 'Successful' });
  }
  return res.status(500).json({ status: 500, message: 'req.body' });

}

module.exports = {"spdRouter": router};