const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const ProfilModel = require("../models/profil");
const UserModel = require("../models/User");

const uploadCloud = require("../config/cloudinary.js");

router.get("/user/unregister", (req, res) => {
  UserModel.findOneAndDelete({ _id: req.session.currentUser._id })
    .then(dbRes => {
      console.log("oki papy tout va bien", dbRes);
      res.redirect("/logout");
    })
    .catch(dbErr => console.log(dbErr));
});

router.get("/profil", (req, res) => {
  res.render("form_add_profil");
});

router.post("/profil", uploadCloud.single("photo"), (req, res) => {
  if (!req.session.currentUser) return res.redirect("/logout");

  const { work, salaire, experience, country } = req.body;

  const profil = {
    work,
    salaire,
    experience,
    country,
    userId: req.session.currentUser._id
  };

  if (req.file) {
    profil.image = req.file.secure_url;
  }

  ProfilModel.create(profil)
    .then(dbRes => {
      res.redirect("/profiles-manage");
    })
    .catch(dbErr => {
      console.log(dbErr);
    });
});

router.get("/profiles-manage", (req, res) => {
  if (!req.session.currentUser) return res.redirect("/logout");

  ProfilModel.find({ userId: req.session.currentUser._id })
    .then(profiles => {
      res.render("profiles_manage", { profiles });
    })
    .catch(err => {
      consople.log(err);
    });
});

router.get("/profile-delete/:id", (req, res) => {
  if (!req.session.currentUser) return res.redirect("/logout");
  ProfilModel.findOneAndRemove(req.params.id)
    .then(dbRes => {
      // console.log(dbRes);
      res.redirect("/profiles-manage");
    })
    .catch(err => console.error(err));
});

module.exports = router;
