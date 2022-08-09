const express = require("express");
const { readFile, prepareData } = require("./file-reader.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());

const jsonData = readFile("data.json");
const processedData = prepareData(jsonData);

app.get("/", function (req, res) {
  const name = req.query.full_name.toLowerCase().split(" ");
  const domain = req.query.domain;

  if (name.length < 2) {
    return res
      .status(400)
      .send("Name should must contain first_name and last_name");
  }

  const list = processedData[domain];
  if (!list) {
    return res.status(200).json("Sorry: Unable to derive email");
  } else {
    const first_name = list[0];
    const complete_name = list[1].replace(/\s/g, "").toLowerCase();
    let derive_email = "";

    if (complete_name == first_name) {
      derive_email = name[0] + name[1] + "@" + domain;
    } else {
      derive_email = name[0][0] + name[1] + "@" + domain;
    }

    return res.status(200).json(derive_email);
  }
});

app.listen(3005, () => {
  console.log("Listening on PORT:3005");
});

module.exports = app;
