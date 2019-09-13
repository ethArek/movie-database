const router = require("express").Router();

const { User } = require("../../models/user.js");

router.post("/register", async (req, res) => {
  try {
    const body = _.pick(req.body, ["email", "password"]);
    const user = new User(body);

    await user.save();
    res.json({ success: true, message: "Dodano uzytkownika" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Błąd połączenia z serwerem" });
  }
});
