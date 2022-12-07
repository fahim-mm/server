const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/employee", (req, res) => {
  fs.readFile("count", "utf8", (err, data) => {
    const alldata = JSON.parse(data);
    res.send(JSON.stringify(alldata.employee));
  });
});

app.post("/add-employee", (req, res) => {
  fs.readFile("count", "utf8", (err, data) => {
    const alldata = JSON.parse(data);
    const employeeData=req.body;
    employeeData.id=alldata.employee.length+1;
    alldata.employee.push(employeeData);
    fs.writeFile("count", JSON.stringify(alldata), () => {});
    res.send(`${req.body.name} added`);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
