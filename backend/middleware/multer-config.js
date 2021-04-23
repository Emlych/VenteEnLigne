const multer = require("multer");

//Multer donne pas automatiquement l'extension du fichier entrant, donc il faut utiliser le type MIME
//pour déterminer son format et donc trouver son extension.
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/jpg": "png",
};

//Logique précisant à MULTER où enregistrer les fichiers
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    //enregistrer les fichiers dans le dossier images
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

//export du multer configuré pour gérer uniquement téléchargements de fichiers image
module.exports = multer({ storage: storage }).single("image");
