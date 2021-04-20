const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.signup = (req, res, next) => {
  bcrypt //fonction asynchrone de hachage
    .hash(req.body.password, 10) //hash(mot de passe, nombre de fois où l'on exécute l'algo de hashage)
    .then((hash) => {
      const user = new User({
        //création d'un utilisateur
        email: req.body.email,
        password: hash,
      });
      user
        .save() //enregistre l'utilisateur dans la bdd
        .then(() => res.status(201).json({ message: "Utilisateur créé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error })); //500 : erreur serveur
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      //si on trouve un user ou non
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect" });
          }
          res.status(200).json({
            userId: user._id,
            token: "TOKEN",
          });
        })
        .catch((error) => res.status(500).json({ error })); //comparer mdp utilisateur avec le hash enregistré
    })
    .catch((error) => res.status(500).json({ error })); //si problème de connexion uniquement
};
