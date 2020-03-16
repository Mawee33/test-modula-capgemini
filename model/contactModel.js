const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    nom: String,
    prenom: String,
    mail: String,
    message: String
})

const contact = mongoose.model("contact", contactSchema);

module.exports = contact;