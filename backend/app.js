const express = require("express");
const mongoose = require("mongoose");
const stuffRoutes = require("./route/stuff");
const userRoutes = require("./route/user");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://EmilyLD:p@nd0r@@cluster0.4hmbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MangoDB réussie"))
  .catch(() => console.log("Connexion à MangoDB échouée."));

//Eviter les erreurs de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //accéder à notre API depuis n'importe quelle origine
  res.setHeader(
    //ajout headers mentionnés aux requêtes envoyés vers notre API
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    //Envoyer requêtes avec ces méthodes
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
