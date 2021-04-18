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
// app.post("/api/stuff", (req, res, next) => {
//   console.log(req.body);
//   console.log("route post");
//   res.status(201).json({ message: "objet créé" }); //Requête réussie et ressource créée
//   next();
// });
app.post("/api/stuff", (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    //création de l'instance du modèle Thing
    ...req.body,
  });
  thing
    .save() //cette méthode renvoie un promise
    .then(() => {
      console.log("Thing pris en compte");
      res.status(201).json({ message: "objet enregistré" });
    })
    .catch((error) => {
      console.error(error);
      res.status(400).json({ error });
    });
});

//Mise à jour Thing existant
app.put("/api/stuff/:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet modifié" }))
    .catch((error) => res.status(400).json({ error }));
  next();
});

//Suppression d'un Thing
app.delete("/api/stuff/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "Objet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

//Récupération d'un Thing spécifique
app.get("/api/stuff/:id", (req, res, next) => {
  //segment dynamique
  Thing.findOne({ _id: req.params.id }) //trouver thing unique ayant le même _id que le paramètre de la requête
    .then((thing) => res.status(200).json(thing)) //retourne ce thing dans le promise et envoyé au front-end
    .catch((error) => res.status(404).json({ error }));
});

//Récupération de la liste de Things
app.get("/api/stuff", (req, res) => {
  Thing.find() //retourne un promise
    .then((things) => res.status(200).json(things))
    .catch((error) => {
      res.status(400).json({ error });
    });
});

module.exports = app;
