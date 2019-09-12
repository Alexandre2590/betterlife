const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res, next) => {
  const theUsername = req.body.name;
  const theUserLastname = req.body.lastname;
  const theUseremail = req.body.email;
  const theUserpassword = req.body.password;



  if (
    theUserLastname === "" ||
    theUserpassword === "" ||
    theUsername === "" ||
    theUserpassword === ""
  ) {
    res.render("signup", {
      errorMessage: "Un champ n'est pas rempli"
    });
    return;
  }
  

  User.findOne({ email: theUseremail })
    .then(user => {
      if (user) {
        res.render("signup", {
          errorMessage: "the username already exist."
        });
        return;
      }
     
      const salt = bcrypt.genSaltSync(10); // cryptography librairie
      const hashed = bcrypt.hashSync(theUserpassword, salt);
      const newUser = {};
      newUser.password = hashed;
      newUser.email = theUseremail;
      newUser.lastname = theUserLastname;
      newUser.name = theUsername;

      User.create(newUser)
        .then(() => res.redirect("/"))
        .catch(err => next(err));
    })
    .catch(dbErr => {
      next(dbErr);
    });
});

router.post("/signin", (req, res, next) => {
  const theemail = req.body.email;
  const thePassword = req.body.password;

  if (theemail === "" || thePassword === "") {
    res.render("signup", {
      errorMessage: "Please enter both, username and password to sign up."
    });
    return;
  }

  User.findOne({ email: theemail })
    .then(user => {
      if (!user) {
        res.render("signup", {
          errorMessage: "The username doesn't exist."
        });
        return;
      }

      if (bcrypt.compareSync(thePassword, user.password)) {
        // Save the login in the session!
        req.session.currentUser = user;
        res.redirect("/");
      } else {
        res.render("signup", {
          errorMessage: "Incorrect password"
        });
      }
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
