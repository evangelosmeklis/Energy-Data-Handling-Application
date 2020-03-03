module.exports = app => {
  const entry = require("../controlers/entry.controller.js");
  const sql = require("../models/db.js");
  const bcrypt = require('bcrypt');
  const isloggedin=require('../routes/isloggedin.js');
  const authcheck=require('../routes/authcheck.js');
  var express=require('express');

  // Retrieve a single Entry with Id
  var fs=require('fs');
  var privateKey = fs.readFileSync('private.key');

  var multer=require('multer');
  var upload=multer({storage: '2000MB'});

  app.get("/entry/:Id", entry.findOne);
  
  app.get("/energy/api/HealthCheck",entry.healthcheck);
  
  app.post("/energy/api/Reset",entry.reset);
 
  app.post("/energy/api/Login", function(req,res){ 
  		var jwt=require('jsonwebtoken');
  		//console.log(req.body);
  		sql.query(`SELECT user,pass,quota,apikey,email,privileges FROM users WHERE user=?`,[req.body.username],(err,res1) => {
  		    //console.log(res1);
  		    const password=res1[0].pass;
  		    const e=res1[0].email;
  		    const a=res1[0].apikey;
  		    const q=res1[0].quota;
  		    const p=res1[0].privileges;
  		    if(bcrypt.compareSync(req.body.passw,password)){
  				var jwt=require('jsonwebtoken');
  				fs.writeFileSync('tempquota.txt',q);
  				var privateKey = fs.readFileSync('private.key');
  				var token = jwt.sign({user:req.body.username ,passw: req.body.passw,email: e, quota: q,apikey: a,privileges: p }, privateKey, { algorithm: 'HS256' });
  				res.status(200).json({
  					token:token});
  			}
  			else res.status(400).send({message:"Bad Request"});
  		});
  		
  });
  
  app.post("/energy/api/Logout",function(req,res){
  		var jwt=require('jsonwebtoken');
  		const nothing= ' '	
  		fs.writeFileSync('tempquota.txt',nothing);
  		const empty="empty";
  		res.status(200).send(empty);
  });
  
  
   app.post("/energy/api/Admin/users",authcheck,async function(req,res){
   				let hash = bcrypt.hashSync(req.body.passw,10);
				var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
				var b = [];  
				for (var i=0; i<12; i++) {
						var j = (Math.random() * (a.length-1)).toFixed(0);
						b[i] = a[j];
				}
				var rest=b.join("");
				var count=0;
				const resul = [rest[0]];
				for(let x=1; x<rest.length; x++){
						count=count+1;
						if(count==4)
						{
							resul.push('-', rest[x]);
							count=0;
						}
						else
							{
							  resul.push(rest[x]);
							}
					}
				const apik=resul.join('');
				//console.log(apikey);
				//insert into table
				//console.log(req.body.passw);
				//console.log(hash);
				if (req.body.username !== "undefined" && req.body.email !== "undefined" && req.body.quota !== "undefined"){ 
					sql.query(`INSERT INTO users VALUES (?,?,?,?,?,?)`,[req.body.username,hash,req.body.email,req.body.quota,apik,'user'],(err,res2) => {
								if (err) {
								  console.log("error: ", err);
								  result(err, null);
								  return res.status(400).send({message:"Bad Request"});
								}
								else return res.status(200).send({message:"Succesful "+apik});
				});

				}

  }); 
  

  
  app.get("/energy/api/Admin/users/:username",authcheck,entry.userstatus);
  
   app.put("/energy/api/Admin/users/:username",authcheck,async function(req,res){		
	  		let hash = bcrypt.hashSync(req.body.passw,10);
			if (req.body.username !== "undefined" && req.body.email !== "undefined" && req.body.quota !== "undefined"){ 
				sql.query(`UPDATE users SET pass=?,email=?,quota=? WHERE user=?`,[hash,req.body.email,req.body.quota,req.params.username],(err,res1) => {
							if (err) {
							  console.log("error: ", err);
							  result(err, null);
							  res.status(400).send({message:"Bad Request"});
							}
							else  res.status(200).send({message:"Successful"});
			});
			}

  });

  
    app.post("/energy/api/Admin/:table",upload.none(),async function(req,res){
  	    const table = req.params.table;
        const file = req.body;
 		const {Parser} = require('json2csv');
    	const json2csvParser=new Parser();
    	const file1=json2csvParser.parse(file);
        fs.writeFileSync(table +'.csv',' ');
        fs.writeFileSync(table +'.csv',file1,'utf-8');
        if ((req, res)){
            sql.query(`LOAD DATA LOCAL INFILE '`+ table + '.csv' + `' INTO TABLE ${table} FIELDS TERMINATED BY ';'  ENCLOSED BY '\"' ESCAPED BY '' LINES TERMINATED BY '\n' IGNORE 1 ROWS;`, (err,results) => {
                if (err) throw err
                else{
                    const imported = results.affectedRows;
                    var database_counter = database_counter + imported;
                    res.status(200).send({
                        totalRecordsInFile : imported,
                        totalRecordsImported : imported,
                        totalRecordsInDatabase : database_counter
                    });
                }
            });
        }
  });
 
    
  app.get("/energy/api/ActualTotalLoad/:AreaName/:Resolution/date/:Year-:Month-:Day",isloggedin, entry.findTwo);
  
  app.get("/energy/api/ActualTotalLoad/:AreaName/:Resolution/month/:Year-:Month",isloggedin, entry.findThree);
  
  app.get("/energy/api/ActualTotalLoad/:AreaName/:Resolution/year/:Year",isloggedin, entry.findFour);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/AllTypes/:Resolution/date/:Year-:Month-:Day",isloggedin, entry.findEight);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/AllTypes/:Resolution/month/:Year-:Month",isloggedin, entry.findNine);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/AllTypes/:Resolution/year/:Year",isloggedin, entry.findTen);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/:ProductionType/:Resolution/date/:Year-:Month-:Day",isloggedin, entry.findFive);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/:ProductionType/:Resolution/month/:Year-:Month",isloggedin, entry.findSix);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/:ProductionType/:Resolution/year/:Year",isloggedin, entry.findSeven);
  
  app.get("/energy/api/DayAheadTotalLoadForecast/:AreaName/:Resolution/date/:Year-:Month-:Day",isloggedin, entry.findEleven);
  
  app.get("/energy/api/DayAheadTotalLoadForecast/:AreaName/:Resolution/month/:Year-:Month",isloggedin, entry.findTwelve);
  
  app.get("/energy/api/DayAheadTotalLoadForecast/:AreaName/:Resolution/year/:Year", isloggedin, entry.findThirteen);
  
  app.get("/energy/api/ActualvsForecast/:AreaName/:Resolution/date/:Year-:Month-:Day",isloggedin, entry.findFourteen);
  
  app.get("/energy/api/ActualvsForecast/:AreaName/:Resolution/month/:Year-:Month",isloggedin, entry.findFifteen);
  
  app.get("/energy/api/ActualvsForecast/:AreaName/:Resolution/year/:Year",isloggedin,entry.findSixteen);
  

  
  app.get('*', function(req, res){
  	res.status(400).send('Error 400: Bad Request');
  });
	  
};
