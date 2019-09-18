const router = require("express").Router();
const _ = require("lodash");

const User = require("../../models/user.js");

router.post("/register", async (req, res) => {
  try {
    if (!req.body.password || !req.body.email) {
      res
        .status(422)
        .json({ success: false, message: "Pola e-mail i hasło są wymagane" });
    } else {
      const body = {
        email: req.body.email.trim(),
        password: req.body.password
      };

      const user = new User(body);
      await user.save();

      res.json({ success: true, message: "Dodano uzytkownika" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = _.pick(req.body, ["email", "password"]);
    if (!body.password || !body.email) {
      res
        .status(422)
        .json({ success: false, message: "Pola e-mail i hasło są wymagane" });
    } else {
      const user = await User.findByCredentials(body.email, body.password);
      if (!user) {
        res
          .status(403)
          .json({ success: false, message: "E-mail lub hasło są niepoprawne" });
      } else {
        const token = await user.generateAuthToken();
        const result = {
          userId: user._id,
          token: token,
          email: user.email
        };
        res.json({ success: true, result });
      }
    }
  } catch (err) {
    res.status(401).json({ success: false, error: err.message });
  }
});

module.exports = router;
