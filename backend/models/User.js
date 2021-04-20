const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator"); //s'assure que 2 utilisateurs ne partagent pas la même adresse mail

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
