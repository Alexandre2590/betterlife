const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"]
  }
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
