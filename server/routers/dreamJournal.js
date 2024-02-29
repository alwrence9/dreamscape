const express = require('express');
const router = express.Router();
const DB = require("../database/db.js");

const db = new DB();


//Gets the journal entry for a specified user
router.get('/:email', getEntry);
async function getEntry(req, res) {
  const start = Number(req.query.start);
  const end = Number(req.query.end);
  const date = req.query.date;

  let results = await db.getDreamJournals( req.params.email );

  if(date){
    results = results.filter(
      (journalEntry) => {return journalEntry.date.string == date}
    );
  }

  if(start && end){
    results = results.filter(
      (journalEntry) => {return start <= journalEntry.date.sinceEpoch && journalEntry.date.sinceEpoch <= end}
    );
  }
  if (results.length != 0){
    return res.json({"dreams": results});
  }
  return res.status(404).send({status: '404', message: 'No entries found for that user'});
}

//Create a new journal entry for a specified user
router.get('/new', createEntry);
async function createEntry(req, res) {

  let { email, date, subject, description } = req.body;

  if(!date){
    return res.status(401).json({ status: 401, message: ' comment format' });
  }

  if(!description){
    description = "";
  }

  if (email && date.string && date.sinceEpoch && subject) {

    db.insertDreamJournal({"email": email, "date": date, "title": subject, "description": description});
    return res.status(200).json({ status: 201, message: 'Successful' });
  }
  return res.status(401).json({ status: 401, message: 'Journal entry missing information' });
}

module.exports = {"dreamRouter": router};