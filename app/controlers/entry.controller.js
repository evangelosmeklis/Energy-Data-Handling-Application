const Entry = require("../models/ActualTotalLoad.model.js");

// Find a single Customer with a customerId
exports.findOne = (req, res) => {
   Entry.findByPk(req.params.Id, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};


exports.findTwo = (req, res) => {
   Entry.findByPars(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month,req.params.Day, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findThree = (req, res) => {
   Entry.findByPars2(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findFour = (req, res) => {
   Entry.findByPars3(req.params.AreaName,req.params.Resolution,req.params.Year, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findFive = (req, res) => {
   Entry.findByPars4(req.params.AreaName,req.params.ProductionType,req.params.Resolution,req.params.Year,req.params.Month,req.params.Day, (err, data) => {
      if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findSix = (req, res) => {
   Entry.findByPars5(req.params.AreaName,req.params.ProductionType,req.params.Resolution,req.params.Year,req.params.Month, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findSeven = (req, res) => {
   Entry.findByPars6(req.params.AreaName,req.params.ProductionType,req.params.Resolution,req.params.Year, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findEight = (req, res) => {
   Entry.findByPars7(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month,req.params.Day, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findNine = (req, res) => {
   Entry.findByPars8(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findTen = (req, res) => {
   Entry.findByPars9(req.params.AreaName,req.params.Resolution,req.params.Year, (err, data) => {
      if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findEleven = (req, res) => {
   Entry.findByPars10(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month,req.params.Day, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findTwelve = (req, res) => {
   Entry.findByPars11(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findThirteen = (req, res) => {
   Entry.findByPars12(req.params.AreaName,req.params.Resolution,req.params.Year, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findFourteen = (req, res) => {
   Entry.findByPars13(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month,req.params.Day,req.params.Types, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};

exports.findFifteen = (req, res) => {
   Entry.findByPars14(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};


exports.findSixteen = (req, res) => {
   Entry.findByPars15(req.params.AreaName,req.params.Resolution,req.params.Year, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Entry with AreaName ${req.params.AreaName}. Five`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Entry with AreaName " + req.params.AreaName
        });
      }
    } else{
    	if(req.params.Type!==undefined && req.params.Type=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.send(csv);
    	}
    	else if (req.params.Type==undefined || req.params.Type=="json"){
    		 res.send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};
