const express = require('express');
const app = express();
const DB = require("./database/db.js");
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const dotenv = require('dotenv');
dotenv.config();

const db = new DB();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const users = new Array();

app.use(express.static('../client/build'));
app.use(express.json());

app.get('/', (req, res)=>{
  res.json({"Soup" : "Soupreme"});
});

app.post("/auth", async (req, res) => {
  //TODO: should validate that the token was sent first
  const {token} = req.body;
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
  });
  if (!ticket) 
    return res.sendStatus(401); //unauthorized (token invalid)
  const { name, email, picture } = ticket.getPayload();

  const user = {"name" : name, "email": email, "picture": picture};
  const existsAlready = users.findIndex(element => element.email === email);
  if (existsAlready < 0) {
    //insert
    users.push(user);
  } else {
    //update
    users[existsAlready] = user;
  }

  //Important: for production, you must use HTTPS for the session cookie
  //This assumes that your package.json has a start script that runs the
  // server with NODE_ENV set to development or test or production
  let secure = true;
  if (app.get('env') === 'development' || app.get('env') === 'test') {
    secure = false;
  }
  const session = require('express-session');
  // Use the session middleware, expires after 20 minutes
  app.use(session({
    secret: process.env.SECRET, //used to sign the session id
    name: 'id', //name of the session id cookie
    saveUninitialized: false, //don't create session until something stored
    resave: false,
    cookie: { 
      maxAge: 120000, //time in ms
      //should only sent over https, but set to false for testing and dev on localhost
      secure: secure, 
      httpOnly: true, //can't be accessed via JS
      sameSite: 'strict' //only sent for requests to same origin
    }
  }));

   //create a session, using email as the unique identifier
   req.session.regenerate(function(err) {
    if (err) {
      return res.sendStatus(500); //server error, couldn't create the session
    }
    //store the user's info in the session
    req.session.user = user;
    res.json({user: user});
  });


  // TODO: you may want to upsert (update or insert if new) the user's name, email and picture in the database - step 4

  //TODO: create a session cookie send it back to the client - step 5

});

//middleware to verify the session
function isAuthenticated(req, res, next) {
  if (!req.session.user){
    return res.sendStatus(401); //unauthorized
  }
  next();
}

//route for authenticated users only
app.get("/protected",
  isAuthenticated,
  function (req, res) {
    //would actually be doing something
    res.sendStatus(200); 
  }
);

app.get("/logout", isAuthenticated, function (req, res) {
  //destroy the session
  req.session.destroy(function(err) {
    //callback invoked after destroy returns
    if (err) {
      return res.sendStatus(500); //server error, couldn't destroy the session
    }
    res.clearCookie('id'); //clear the cookie
    res.sendStatus(200);
  });  
});

app.post('/api/v1/login', login);
async function login(req, res) {
  const { email, password} = req.body;
  if (email && password) {
    const profile = await db.getProfile( {"email": email} );
    if (profile) {
      const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), email: email}, password);
      //res.status(200).json({ status: 200, message: 'Successful' });
      return res.json((JSON.stringify({token})));
    }
  }
  return res.status(401).json({ status: 401, message: 'Wrong comment format' });
}

//Gets the profile of a user for when they login
app.get('/api/v1/profile/:email', getProfile);
async function getProfile(req, res) {
  res.type('json');
  if (db) {
    let profile;
    try {
      profile = await db.getProfile( {"email": req.params.email} );
      res.json( {"profile": profile});
    } catch (error) {
      res.status(404).send({status: '404', message: 'Not found: ' + error});
    }
  } else {
    res.status(500).send({status: '500', message: 'Database connection not established'});
  }
}

//Create a profile for a user when they sign up
app.post('/api/v1/profile/new', createProfile);
async function createProfile(req, res) {
  const { email, password, firstname, lastname } = req.body;
  const emailPattern = /^([A-z]|[0-9]|\.|-)+@[a-z]+(\.[a-z]+)+$/g;

  if (email.match(emailPattern) && password && firstname && lastname) {
    db.insertProfile({ "email": email, "password": password, "firstName": firstname, "lastName": lastname });
    return res.status(201).json({ status: 201, message: 'Successful' });
  }
  return res.status(401).json({ status: 401, message: 'Wrong profile format' });

}

//Get sleep logs for the week for a specific user
app.get('/api/v1/sleeplogs/:email', getSleepLogs);
async function getSleepLogs(req, res) {
  res.type('json');
  if (db) {
    let sleepLogs;
    try {
      //TO DO: GET SLEEP LOGS FOR THE WEEK FROM DB BY EMAIL
      res.json( {"sleeplogs": sleepLogs});
    } catch (error) {
      res.status(404).send({status: '404', message: 'Not found: ' + error});
    }
  } else {
    res.status(500).send({status: '500', message: 'Database connection not established'});
  }
}

//Creates a sleep log for a specified user
app.post('/api/v1/sleeplogs/new', createSleepLog);
async function createSleepLog(req, res) {
  const { date, email, sleephours, comment } = req.body;
  if (date && email && sleephours && comment) {
    //TO DO: INSERT NEW SLEEPLOG INTO DB
    return res.status(200).json({ status: 200, message: 'Successful' });
  }
  return res.status(401).json({ status: 401, message: 'Wrong comment format' });

}

//Gets the journal entry for a specified user
app.get('/api/v1/entries/:email', getEntry);
async function getEntry(req, res) {
  res.type('json');
  if (db) {
    let entries;
    try {
      //TO DO: GET JOURNAL ENTRIES FROM DB BY EMAIL
      res.json( {"entries": entries});
    } catch (error) {
      res.status(404).send({status: '404', message: 'Not found: ' + error});
    }
  } else {
    res.status(500).send({status: '500', message: 'Database connection not established'});
  }
}

//Create a new journal entry for a specified user
app.get('/api/v1/entries/new', createEntry);
async function createEntry(req, res) {
  const { email, date, subject, description } = req.body;
  if (email && date && subject && description) {
    //TO DO: INSERT NEW JOURNAL ENTRY INTO DB
    return res.status(200).json({ status: 200, message: 'Successful' });
  }
  return res.status(401).json({ status: 401, message: 'Wrong comment format' });

}

// 404 route
app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found' });
});

module.exports = { app };
