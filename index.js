const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/employe", (req, res) => {
  fs.readFile("count", "utf8", (err, data) => {
    const alldata = JSON.parse(data);
    res.send(JSON.stringify(alldata.employ));
  });
});

app.get("/add-employ/:name", (req, res) => {
  fs.readFile("count", "utf8", (err, data) => {
    const alldata = JSON.parse(data);
    alldata.employ.push(req.params.name);
    fs.writeFile("count", JSON.stringify(alldata), () => {});
    res.send(`${req.params.name} added`);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
