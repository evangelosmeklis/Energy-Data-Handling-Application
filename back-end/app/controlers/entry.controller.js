const Entry = require("../models/ActualTotalLoad.model.js");
const sql = require("../models/db.js");
  
// Find a single Customer with a customerId
exports.findOne = (req, res) => {
   Entry.findByPk(req.params.Id, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
       else console.log("Error 400: Bad Request");
      }
  });
};


exports.healthcheck = (req,res) => {
   Entry.healthcheck((err, data) => {
    if (err) {
        res.status(400).send({
          message: err
    	});
    } 
	else { res.status(200).send(data); }
   });
}

exports.reset = (req,res) => {
   Entry.reset((err, data) => {
    if (err) {
        res.status(400).send({
          message: err
    	});
    } 
	else { res.status(200).send(data); }
   });
}

exports.userstatus = (req, res) => {
   Entry.cuserstatus(req.params.username, (err, data) => {
    if (err) {
        res.status(400).send({
          message: "Bad Request"
    	});
    } 
	else { res.status(200).send(data); }
   });
}

exports.findTwo =async function (req, res) {
	   Entry.findByPars(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month,req.params.Day, (err, data) => {
		if (err) {
		  if (err.kind === "not_found") {
		    res.status(403).send({
		      message: `No data`
		    });
		  } else {
		    res.status(400).send({
		      message: "Bad Request"
		    });
		  }
		} else{ 
			if(req.query.format!==undefined && req.query.format=="csv"){
				 const {Parser} = require('json2csv');
				 const json2csvParser=new Parser();
				 const csv=json2csvParser.parse(data);
				 res.status(200).send(csv);
			}
			else if (req.query.format==undefined || req.query.format=="json"){
				 res.status(200).send(data);
		    }
		    else { 
		   		res.status(400).send({
		   		message: "Bad Request"
		   		});
		    }
		  }

	   });
}

exports.findThree = (req, res) => {
   Entry.findByPars2(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
		 else { 
			   		res.status(400).send({
			   		message: "Bad Request"
			   		});
			   }
      }
  });
};

exports.findFour = (req, res) => {
   Entry.findByPars3(req.params.AreaName,req.params.Resolution,req.params.Year, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};

exports.findFive = (req, res) => {
   Entry.findByPars4(req.params.AreaName,req.params.ProductionType,req.params.Resolution,req.params.Year,req.params.Month,req.params.Day, (err, data) => {
      if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};

exports.findSix = (req, res) => {
   Entry.findByPars5(req.params.AreaName,req.params.ProductionType,req.params.Resolution,req.params.Year,req.params.Month, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};

exports.findSeven = (req, res) => {
   Entry.findByPars6(req.params.AreaName,req.params.ProductionType,req.params.Resolution,req.params.Year, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};

exports.findEight = (req, res) => {
   Entry.findByPars7(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month,req.params.Day, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};

exports.findNine = (req, res) => {
   Entry.findByPars8(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};

exports.findTen = (req, res) => {
   Entry.findByPars9(req.params.AreaName,req.params.Resolution,req.params.Year, (err, data) => {
      if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};

exports.findEleven = (req, res) => {
   Entry.findByPars10(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month,req.params.Day, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};

exports.findTwelve = (req, res) => {
   Entry.findByPars11(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};

exports.findThirteen = (req, res) => {
   Entry.findByPars12(req.params.AreaName,req.params.Resolution,req.params.Year, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};

exports.findFourteen = (req, res) => {
   Entry.findByPars13(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month,req.params.Day,req.query.formats, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};

exports.findFifteen = (req, res) => {
   Entry.findByPars14(req.params.AreaName,req.params.Resolution,req.params.Year,req.params.Month, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};


exports.findSixteen = (req, res) => {
   Entry.findByPars15(req.params.AreaName,req.params.Resolution,req.params.Year, (err, data) => {
     if (err) {
      if (err.kind === "not_found") {
        res.status(403).send({
          message: `No data`
        });
      } else {
        res.status(400).send({
          message: "Bad Request"
        });
      }
    } else{
    	if(req.query.format!==undefined && req.query.format=="csv"){
    		 const {Parser} = require('json2csv');
    		 const json2csvParser=new Parser();
    		 const csv=json2csvParser.parse(data);
    		 res.status(200).send(csv);
    	}
    	else if (req.query.format==undefined || req.query.format=="json"){
    		 res.status(200).send(data);
       }
        else { 
       		res.status(400).send({
       		message: "Bad Request"
       		});
       }
      }
  });
};
