const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const ProfilModel = require("../models/profil.js");
const uploadCloud = require("../config/cloudinary.js");

router.get("/profil", (req, res) => {
  res.render("form_add_profil");
});

router.post("/profil", uploadCloud.single("photo"), (req, res) => {
  var profil = {};
  profil.work = req.body.work;
  profil.salaire = req.body.salaire;
  profil.age = req.body.age;
  profil.description = req.body.decription;
  profil.country = req.body.country;
  profil.genre = req.body.genre;
  // profil.tags = req.body.price;
  if (req.file) {
    profil.image = req.file.secure_url;
  }
  console.log(profil);

  ProfilModel.create(profil)
    .then(dbRes => {
      res.redirect("/al-lovertheworld");
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
  // product.save(function(err) {
  //         if (err) throw err
  //     res.redirect('/add-product')
  // })
});

module.exports = router;
