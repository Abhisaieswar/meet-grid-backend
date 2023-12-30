const bcrypt = require("bcrypt");

const { validationResult } = require("express-validator");
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");

exports.authenticate = async (req, res) => {
  const jwtToken = req.headers["authorization"]?.split(" ")[1];

  if (jwtToken === undefined) {
    res.status(401);
    res.send("Invalid Access Token");
  } else {
    jwt.verify(jwtToken, "secret_key", async (error, payload) => {
      if (error) {
        res.status(401);
        res.send("Invalid Access Token");
      } else {
        res.status(200);
        res.send("Success");
      }
    });
  }
};

exports.signIn = async (req, res) => {
  const { userName, password } = req.body;
  const hashedPwd = await bcrypt.hash(password, 10);
  //store hashed pwd in db and verify pwd
  const jwtToken = await jwt.sign({ userName }, "secret_key");
  res.json({ jwtToken });
};

exports.signUp = (req, res) => {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(422).json({ error: errors.array()[0].msg });
  //   }
  //   User.findOne({ email: req.body.email }).exec((error, user) => {
  //     if (user) {
  //       return res
  //         .status(400)
  //         .json({ error: "Account with given email is already exists" });
  //     }
  //     const newUser = new User(req.body);
  //     newUser.save((error, user) => {
  //       if (error) {
  //         return res
  //           .status(400)
  //           .json({ error: "Unable to create account. Try again!" });
  //       }
  //       return res.status(201).json({});
  //     });
  //   });
};
