const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const dbConnection = require("./middlewares/dbConnection.js");

app.use(bodyParser.json());
app.use(dbConnection);
app.use("/API", require("./API"));

app.listen(port, () => {
  console.log("listening on port " + port);
});
