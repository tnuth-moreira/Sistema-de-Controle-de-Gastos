const express = require("express");
const rotas = require("./rotas");

const app = express();

app.use(express.json());
app.use(rotas);


app.get("/", (request, response) => {
  response.send("Hello World");
});



module.exports = app;



  