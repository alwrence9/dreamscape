const express = require('express');
const router = express.Router();
const DB = require("../database/db.js");
const jwt = require('jsonwebtoken');

const db = new DB();

//Gets the profile of a user for when they login
router.get('/', getCards);
async function getCards(req, res) {
  res.type('json');
  const cards = await db.getTarotCards();
  if(cards){
    return res.json( {"tarotCards": cards});
  }
  else{
    return res.status(404).send({status: '404', message: "No tarot cards found"});
  }
}


module.exports = {"tarotRouter": router};