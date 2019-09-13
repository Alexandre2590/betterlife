const express = require("express");
const router = new express.Router();
const profilModel = require("../models/profil.js");

router.get(["/", "/home"], (req, res) => {
  res.render("index");
});

router.get("/al-lovertheworld", (req, res) => {
  profilModel
    .find()
    .then(dbRes => {
      res.render("profils", { profil: dbRes });
      console.log(dbRes);
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/profils/:cat", (req, res) => {
  // truc pour récupérer le model sur le model il y aune methode pour tout trouver

  res.render("profils", { profils: "elements venant de la db" });
});

router.get("/one-product/:id", (req, res) => {
  res.render("one_product");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.get("/job", (req, res) => {
  res.render("test");
});

router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
