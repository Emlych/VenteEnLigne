const express = require("express");

const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://EmilyLD:p@nd0r@@cluster0.4hmbz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MangoDB réussie"))
  .catch(() => console.log("Connexion à MangoDB échouée."));

const app = express();
const Thing = require("./models/Thing");

//Eviter les erreurs de CORS
app.use((req, res, next) => {
  console.log("Test CORS");
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

app.use(express.json());

//toujours placer post avant get. Sinon GET interceptera toutes les demandes envoyées à /api/stuff
//Route Post permet de capturer les données postées
app.post("/api/stuff", (req, res, next) => {
  console.log(req.body);
  console.log("route post");
  res.status(201).json({ message: "objet créé" }); //Requête réussie et ressource créée
  next();
});

app.use("/api/stuff", (req, res) => {
  console.log("Fourniture de la liste des articles");
  const stuff = [
    {
      _id: "1er identifiant",
      title: "Appareil photo Canon",
      description: "Objectif grand angle",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4388,
      userId: "JnooIII",
    },
    {
      _id: "2e identifiant",
      title: "Appareil photo Kodak",
      description: "Appareil photo jetable",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 485,
      userId: "JnooIInnnI",
    },
    {
      _id: "3e identifiant",
      title: "Appareil photo Je sais pas",
      description: "Appareil photo jetable",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 6668,
      userId: "aJnooIIndsannI",
    },
  ];
  res.status(200).json(stuff); //code 200 pour une demande réussie
});

module.exports = app;
