const express = require('express');
const router = express.Router();
const DB = require("../database/db.js");
const cache = require('memory-cache');

const db = new DB();

//Get sleep logs for the week for a specific user
router.get('/:email', getSleepLogs);
async function getSleepLogs(req, res){

  const email = req.params.email;
  const start = Number(req.query.start);
  const end = Number(req.query.end);

  let results = cache.get(`${email}-sleepLogs`);
  if(!results){
    results = await db.getSleepLogs( email );
    cache.put(`${email}-sleepLogs`, JSON.stringify(results));
  }
  else{
    results = JSON.parse(results);
  }

  if(start && end){
    results = results.filter(
      (sleepLogEntry) => {return start <= sleepLogEntry.date.sinceEpoch && sleepLogEntry.date.sinceEpoch <= end}
    );
  }

  if (results.length !== 0){
    return res.json({"sleepLogs": results});
  }

  return res.status(404).send({status: '404', message: 'No entries found for that user'});
}

//Creates a sleep log for a specified user
router.post('/new', createSleepLog);
async function createSleepLog(req, res) {

  const { email, date, hoursSlept, optionalComment } = req.body;

  let comment
  if(!optionalComment){
    comment = "No comment submitted.";
  }
  else{
    comment = optionalComment;
  }

  if(!date){
    return res.status(401).json({ status: 401, message: 'Sleep log missing date.' });
  }

  if (date.string && date.sinceEpoch && email && hoursSlept !== undefined) {
    db.insertSleepLog({
      "email": email,
      "date": date,
      "hoursSlept": hoursSlept,
      "notes": comment
    });
    cache.del(`${email}-sleepLogs`);
    return res.status(201).json({ status: 201, message: 'Successful' });
  }
  return res.status(401).json({ status: 401, message: 'Sleep log missing information' });

}

module.exports = {"sleepRouter": router};