const express = require('express');
const router = express.Router();
const DB = require("../database/db.js");

const db = new DB();

//Gets the SPD entries
router.get('/all', getSPDentries);
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

module.exports = {"spdRouter": router};