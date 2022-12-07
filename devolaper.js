const express = require("express");
const app = express();
const port = 3001;
const fs = require("fs");
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get("/", (req, res) => {
    res.send("fahim media");
  });

  app.get("/building", (req, res) => {
    fs.readFile("home","utf8",(err,data)=>{
        const allbuilding = JSON.parse(data);
        res.send(JSON.stringify(allbuilding.building));
    })
   
  });

  app.post("/add-building", (req, res) => {
    fs.readFile("home", "utf8", (err, data) => {
      const allbuilding = JSON.parse(data);
      const buildingData=req.body;
      buildingData.id=allbuilding.building.length+1;
      allbuilding.building.push(buildingData);
      fs.writeFile("home", JSON.stringify(allbuilding), () => {});
      res.send(`${req.body.name} added`);
    });
  });
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
