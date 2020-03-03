var fs = require('fs');
var http = require('http');
var https = require('https');
const express = require("express");
const app = express();

var options = {
	key: fs.readFileSync('server-key.pem'),
	cert:fs.readFileSync('server-crt.pem'),
	ca:fs.readFileSync('ca-crt.pem')
};

// parse requests of content-type: application/json
const bodyParser = require("body-parser");
  app.use(bodyParser.json({limit: '2000mb'}));
  app.use(bodyParser.urlencoded({limit: '2000mb', extended: true,parameterLimiti:50000})); 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to apv2020 application." });
});

require("./app/routes/entry.routes.js")(app);

// set port, listen for requests
https.createServer(options,app).listen(8765, () => {
  console.log("Server is running on port 8765.");
});

module.exports=app
