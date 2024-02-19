const express = require('express');
const app = express();

app.use(express.static('../client/build'));
app.use(express.json());

app.use(express.static('../client/build'));

app.get('/', (req, res)=>{
  res.json({"Soup" : "Soupreme"});
});

app.use(express.json());

// 404 route
app.use((req, res) => {
  res.status(404).json({ message: '404 - Not Found' });
});

module.exports = { app };
