const express = require('express');
const router = express.Router();
const DB = require("../database/db.js");

const db = new DB();

//Gets the chronotype questions
router.get('/chronotype', getChronotypeQuestion);
async function getChronotypeQuestion(req, res) {
  res.type('json');
  const questions = await db.getChronotypeQuestion();
  if(questions){
    return res.json( {"questions": questions});
  }
  else{
    return res.status(404).send({status: '404', message: "Questions not found"});
  }
}

//Gets the insomnia questions
router.get('/insomnia', getInsomniaQuestion);
async function getInsomniaQuestion(req, res) {
  res.type('json');
  const questions = await db.getInsomniaQuestion();
  if(questions){
    return res.json( {"questions": questions});
  }
  else{
    return res.status(404).send({status: '404', message: "Questions not found"});
  }
}

module.exports = {"questionsRouter": router};