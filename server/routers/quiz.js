const express = require('express');
const router = express.Router();
const DB = require("../database/db.js");
const cache = require('memory-cache');

const db = new DB();

//Gets the chronotype questions
router.get('/chronotype', getChronotypeQuestion);
async function getChronotypeQuestion(req, res) {
  res.type('json');

  let questions = cache.get("chronotype-questions");
  if(!questions){
    questions = await db.getChronotypeQuestion();
    cache.put("chronotype-questions", JSON.stringify(questions));
  }
  else{
    questions = JSON.parse(questions);
  }
  
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

  let questions = cache.get("insomnia-questions");
  if(!questions){
    questions = await db.getInsomniaQuestion();
    cache.put("insomnia-questions", JSON.stringify(questions));
  }
  else{
    questions = JSON.parse(questions);
  }

  if(questions){
    return res.json( {"questions": questions});
  }
  else{
    return res.status(404).send({status: '404', message: "Questions not found"});
  }
}

module.exports = {"questionsRouter": router};