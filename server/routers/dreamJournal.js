const express = require('express');
const router = express.Router();
const DB = require("../database/db.js");

const db = new DB();

//Create a new journal entry for a specified user
router.post('/new', createEntry);
async function createEntry(req, res) {

  const {email, date, title, optionalDescription } = req.body;

  if(!date){
    return res.status(401).json({ status: 401, message: 'Missing date for dream journal entry' });
  }

  let description
  if(!optionalDescription){
    description = "";
  }
  else{
    description = optionalDescription;
  }

  if (email && date.string && date.sinceEpoch && title) {

    db.insertDreamJournal({"email": email, "date": date, "title": title, "description": description});
    return res.status(201).json({ status: 201, message: 'Successful' });
  }
  return res.status(401).json({ status: 401, message: 'Dream journal entry missing information' });
}

//Gets the journal entry for a specified user
router.get('/:email', getEntry);
async function getEntry(req, res) {
  const start = Number(req.query.start);
  const end = Number(req.query.end);
  const date = req.query.date;

  let results = await db.getDreamJournals( req.params.email );

  if(date){
    results = results.filter(
      (journalEntry) => {return journalEntry.date.string === date}
    );
  }

  if(start && end){
    results = results.filter(
      (journalEntry) => {return start <= journalEntry.date.sinceEpoch && journalEntry.date.sinceEpoch <= end}
    );
  }
  if (results.length !== 0){
    return res.json({"dreams": results});
  }
  return res.status(404).send({status: '404', message: 'No entries found for that user'});
}

module.exports = {"dreamRouter": router};