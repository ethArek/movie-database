const dbConnection = async (req, res, next) => {
  try {
    require("../db/connection.js");
    next();
  } catch (e) {
    res.status(500).send({ error: "Błąd połączenia z bazą danych" });
  }
};

module.exports = dbConnection;
