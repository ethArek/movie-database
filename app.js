const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const port = process.env.PORT || 3000;
const dbConnection = require("./middlewares/dbConnection.js");

app.use(bodyParser.json());
app.use(dbConnection);
app.use("/API", require("./API"));

app.get("/", (req, res) => {
  res.send(
    "<h2 style='text-align: center; margin-top: 25px;'>Dokumentacja API dostępna na: <a href='https://github.com/ethArek/movie-database'>GITHUB</a></h2>"
  );
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
