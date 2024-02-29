const express = require('express');
const app = express();
const DB = require("./database/db.js");
const jwt = require('jsonwebtoken');

const db = new DB();

const { sleepRouter } = require("./routers/sleepLog.js");
const { profileRouter } = require("./routers/profile.js");
const { dreamRouter } = require("./routers/dreamJournal.js");


app.use(express.static('../client/build'));
app.use(express.json());
app.get('/', (req, res)=>{
  res.json({"Soup" : "Soupreme"});
});

app.post('/api/v1/login', login);
async function login(req, res) {
  const { email, password} = req.body;
  if (email && password) {
    const profile = await db.getProfile( {"email": email} );
    if (profile) {
      const token = jwt.sign({email: email}, password);
      res.status(200).json({ status: 200, message: 'Successful' });
      return res.json(({token}));
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