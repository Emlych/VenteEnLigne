const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const stuffController = require("../controllers/stuff");

router.post("/", auth, multer, stuffController.createThing); //toujours placer multer après auth
router.get("/:id", auth, stuffController.getOneThing);
router.put("/:id", auth, multer, stuffController.modifyThing);
router.delete("/:id", auth, stuffController.deleteThing);
router.get("/", auth, stuffController.getAllThings);

module.exports = router;
