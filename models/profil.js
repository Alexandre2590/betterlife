const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profilSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  work: String,
  salaire: String,
  experience: String,
  country: String,
  image: {
    type: String,
    default:
      "https://jadopteunprojet.com/assets/CommunityMember/_resampled/CropboxedImageWzMwMCwzMDBd/Avatar-1529917412.png"
  }
});

const profilModel = mongoose.model("profil", profilSchema);

module.exports = profilModel;
