var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.cert', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const express = require("express");
const app = express();

var httpsServer = https.createServer(credentials, app);

// parse requests of content-type: application/json
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to apv2020 application." });
});

require("./app/routes/entry.routes.js")(app);

// set port, listen for requests
httpsServer.listen(8765, () => {
  console.log("Server is running on port 8765.");
});

