const User = require("../models/User");
const Token = require("../models/Token");

// Bcryptjs
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var privateKey = "*(&1khoapham.vn21hsady1sadhja";

module.exports = function (app) {
  app.post("/register", function (req, res) {
    console.log("Post register");
    console.log(req.body.Email);

    const {
      Email,
      Username,
      Name,
      Password,
      Image,
      Address,
      PhoneNumber,
      Active,
      RegisterDate,
    } = req.body;

    if (
      !Username ||
      !Password ||
      !Name ||
      !Image ||
      !Email ||
      !Address ||
      !PhoneNumber
    ) {
      res.json({ kq: 0, errMsg: "Lack of parameter" });
    } else {
      var un = req.body.Username.trim();

      User.findOne({ Username: un }).then((data) => {
        if (data == null) {
          //Ma hoa password voi Bcryptjs
          bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(req.body.Password, salt, function (err, hash) {
              if (err) {
                res.json({ kq: 0, errMsg: "Password encode error!" });
              } else {
                // Save user to Mongo Server
                var newUser = User({
                  Username: req.body.Username,
                  Password: hash,
                  Name: req.body.Name,
                  Image: req.body.Image,
                  Email: req.body.Email,
                  Address: req.body.Address,
                  PhoneNumber: req.body.PhoneNumber,
                  Active: true,
                  RegisterDate: Date.now(),
                });

                newUser.save().then((usr) => {
                  if (!usr) {
                    console.log(err);
                    res.json({ kq: 0, errMsg: "Mongo save user error" });
                  } else {
                    res.json({
                      kq: 1,
                      errMsg: "User register successfully.",
                    });
                  }
                });
              }
            });
          });
        } else {
          res.json({ kq: 0, errMsg: "Email/Username is not availble." });
        }
      });
    }
  });
};
