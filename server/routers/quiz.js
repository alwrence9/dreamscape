const express = require('express');
const router = express.Router();
const DB = require("../database/db.js");

const db = new DB();

//Gets the chronotype questions
router.get('/chronotype/:numQuestions?', getChronotypeQuestion);
async function getChronotypeQuestion(req, res) {
  const numQuestions = req.params.numQuestions;
  res.type('json');
  
  const questions = numQuestions ? await db.getRandomChronotypeQuestion(numQuestions) : await db.getChronotypeQuestion();
  if(questions){
    return res.json( {"questions": questions});
  }
  else{
    return res.status(404).send({status: '404', message: "Questions not found"});
  }
}

//Gets the insomnia questions
router.get('/insomnia/:numQuestions?', getInsomniaQuestion);
async function getInsomniaQuestion(req, res) {
  res.type('json');

  const numQuestions = req.params.numQuestions;
  const questions = numQuestions ? await db.getRandomInsomniaQuestion(numQuestions) : await db.getInsomniaQuestion();
  if(questions){
    return res.json( {"questions": questions});
  }
  else{
    return res.status(404).send({status: '404', message: "Questions not found"});
  }
}

module.exports = {"questionsRouter": router};