const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const profilSchema = new Schema ({
    work : String,
    salaire : String,
    age: String,
    description:String,
    country: String,
    image:String,
    genre: String,
    // tags:String,
})

const profilModel = mongoose.model ("profil", profilSchema);

module.exports= profilModel;