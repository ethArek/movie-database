const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/API", require("./API"));

app.listen(port, () => {
  console.log("listening on port " + port);
});
