const express = require('express');
const app = express();
const DB = require("./database/db.js");
const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');
const dotenv = require('dotenv');
const session = require('express-session');
dotenv.config();

const db = new DB();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const { sleepRouter } = require("./routers/sleepLog.js");
const { profileRouter } = require("./routers/profile.js");
const { dreamRouter } = require("./routers/dreamJournal.js");
const { questionsRouter } = require("./routers/quiz.js");


app.use(express.static('../client/build'));
app.use(express.json());
app.get('/', (req, res)=>{
  res.json({"Soup" : "Soupreme"});
});

// Use the session middleware, expires after 20 minutes
app.use(session({secret: 'shhhhhhh'})); 

app.post('/api/v1/googleLogin', async (req, res,) => {
  const {token} = req.body;
  let { name, email, picture } = {};
  if (token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    });
    if (!ticket) 
      return res.sendStatus(401); //unauthorized (token invalid)
    ({ name, email, picture } = ticket.getPayload());

    const user = {"name" : name, "email": email, "picture": picture};
    const profile = await db.getProfile( req.params.email );
    if (!profile) {
      //insert new profile using google info
      var firstname = name.split(" ")[0];
      var lastname = name.split(" ")[1];
      await db.insertProfile({ "email": email, "password": token, "firstName": firstname, "lastName": lastname });
    }

    // //create a session, using email as the unique identifier
    req.session.regenerate(function(err) {
      if (err) {
        return res.sendStatus(500); //server error, couldn't create the session
      }
      //store the user's info in the session
      req.session.user = user;
    });
    }

    return res.json((JSON.stringify({"email": email, "token": token })));
  }
  // TODO: you may want to upsert (update or insert if new) the user's name, email and picture in the database - step 4

  //TODO: create a session cookie send it back to the client - step 5

);

//middleware to verify the session
function isAuthenticated(req, res, next) {
  if (!req.session){
    return res.sendStatus(401); //unauthorized
  }
  next();
}

//route for authenticated users only
app.get("/api/v1/protected",
  isAuthenticated,
  function (req, res) {
    //would actually be doing something
    res.sendStatus(200); 
  }
);

app.delete("/api/v1/logout", isAuthenticated, function (req, res) {
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
    try {
      const profile = await db.getProfile(email);
      if (profile) {
        const token = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), email: email}, password);
        //Create session using email as unique identifier
        req.session.regenerate(function(err) {
          if (err) {
            return res.sendStatus(500); //server error, couldn't create the session
          }
          //store the user's info in the session
          req.session.user = email;
        });
        return res.json((JSON.stringify({"email": email, "token": token })));
      }
    } catch(e) {
      return res.sendStatus(500); 
    }
  }
  return res.status(401).json({ status: 401, message: 'Wrong comment format' });
}

app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/sleeplogs", sleepRouter);
app.use("/api/v1/entries", dreamRouter);

//TO-DO: These to be done in here and do the db questions as well, make sure the questions.json to be done
//and functions to categorize sleepers into chronotypes and sleepers for insomnia
// app.get('/api/v1/questions-type', getQuestionsType);
// app.get('/api/v1/questions-insomnia', getQuestionsInsomnia);



// 404 route
app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found' });
});

module.exports = { app };