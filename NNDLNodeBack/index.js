const express = require("express");

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
var util = require("util");


app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.get("/", (req, res) => {
  //spawn child process, run python, get result
  console.log("started");
  const exec = require("child_process").execSync;
  console.log("required");
  var result = exec("/Library/Frameworks/Python.framework/Versions/3.9/bin/python3 network.py");
  console.log("execed");

  var textdata= result.toString("utf8")


  res.send(textdata);
});

//Start server 
app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});
