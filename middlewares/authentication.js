const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { jwtSecret } = require("../config/config.js");

const auth = async (req, res, next) => {
  try {
    let token = req.body.token;
    if (!token) {
      const netGuruUser = await User.findOne();
      token =
        netGuruUser.accessTokens[netGuruUser.accessTokens.length - 1].token;
      //I did this so you don't have to paste token to body
    }

    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findOne({
      _id: decoded._id,
      "accessTokens.token": token
    });

    if (!user) {
      throw new Error("Nie znaleziono użytkownika");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ error: "Musisz się zalogować" });
  }
};

module.exports = auth;
