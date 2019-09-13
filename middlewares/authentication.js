const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { jwtSecret } = require("../config/config.js");

const auth = async (req, res, next) => {
  try {
    const token = req.session.token;
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
  } catch (e) {
    res.status(401).send({ error: "Musisz się zalogować" });
  }
};

module.exports = auth;
