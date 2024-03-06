const express = require('express');
const router = express.Router();
const DB = require("../database/db.js");
const jwt = require('jsonwebtoken');

const db = new DB();

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
      console.log(email);
    });
    return res.json((JSON.stringify({"email": email, "token": token })));
  }
  return res.status(401).json({ status: 401, message: 'Profile missing information' });
  
}

module.exports = {"profileRouter": router};