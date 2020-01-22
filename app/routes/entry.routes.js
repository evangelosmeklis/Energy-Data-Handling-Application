module.exports = app => {
  const entry = require("../controlers/entry.controller.js");
  const sql = require("../models/db.js");
  const bcrypt = require('bcrypt');
  var express=require('express');

  // Retrieve a single Entry with Id
  var fs=require('fs');
  var privateKey = fs.readFileSync('/home/vangelis/softeng/energy/private.key');
  var jwt=require('express-jwt');
  app.use(
  	jwt({
	  secret: privateKey,
	  credentialsRequired: false,
	  getToken: function fromHeaderOrQuerystring (req) {
		if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		    return req.headers.authorization.split(' ')[1];
		} else if (req.query && req.query.token) {
		  return req.query.token;
		}
		return null;
	  }
	}));
	
 
  app.get("/entry/:Id", entry.findOne);
 
  app.post("/energy/api/Login", function(req,res){ 
  		var jwt=require('jsonwebtoken');
		//console.log(req.query.username);
  		sql.query(`SELECT user,pass,quota,apikey,email FROM users WHERE user=?`,[req.query.username],(err,res1) => {
  		    //console.log(res1);
  		    const password=res1[0].pass;
  		    const e=res1[0].email;
  		    const a=res1[0].apikey;
  		    const q=res1[0].quota;
  		    const p=res1[0].privileges;
  		    if(bcrypt.compareSync(req.query.passw,password)){
  				var jwt=require('jsonwebtoken');
  				var privateKey = fs.readFileSync('/home/vangelis/softeng/energy/private.key');
  				var token = jwt.sign({user:req.query.user ,passw: req.query.passw,email: e, quota: q,apikey: a,privileges: p }, privateKey, { algorithm: 'HS256' });
  				res.status(200).send(token);
  			}
  			else res.status(400).send("Bad Request");
  		});
  		
  });
  
  app.post("/energy/api/Logout",function(req,res){
  		console.log(req.user.apikey);
  		var jwt=require('jsonwebtoken');
  		sql.query(`SELECT apikey FROM users WHERE apikey=?`,[req.user.apikey],(err,res1) => {
  			if (err) {
				console.log("error: ", err);
				result(err, null);
			    return;
			}
			else if (res1.length){
				res.status(200).send(" ");
			}	    
  			else res.status(400).send("Bad Request");
  		});
  });
  
  function getResults(key) {
  return new Promise((resolve, reject) => {
    sql.query("SELECT apikey,privileges FROM users WHERE apikey=?", [key], (err, res1) => {
      if (err) {
        console.log("error: ", err);
        reject(err);
      } else if (res1.length && res1[0].privileges == "superuser") {
        console.log("Apikey correct");
        resolve(1);
      } else {
        resolve(0);
      }
    });
  });
}
  
  app.post("/energy/api/Admin/users",async function(req,res){
  		const correct =await getResults(req.user.apikey);
  		console.log(correct);
			if (correct==1){
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
				//console.log(req.query.passw);
				//console.log(hash);
				if (req.query.username !== "undefined" && req.query.email !== "undefined" && req.query.quota !== "undefined"){ 
					sql.query(`INSERT INTO users VALUES (?,?,?,?,?,?)`,[req.query.username,req.query.passw,req.query.email,req.query.quota,apik,'user'],(err,res2) => {
								if (err) {
								  console.log("error: ", err);
								  result(err, null);
								  return;
								}
				});

				}
				res.send("Succesful "+apik);
			}
			else res.status(401).send("Not authorized");
  });
  
  app.get("/energy/api/Admin/users/:username",entry.userstatus);
  
  app.put("/energy/api/Admin/users/:username", function(req,res){		
  		const correct =await getResults(req.user.apikey);
  		console.log(correct);
		if (correct==1){
			//console.log(hash);
			if (req.params.username !== "undefined" && req.query.email !== "undefined" && req.query.quota !== "undefined"){ 
				sql.query(`UPDATE users SET pass=?,email=?,quota=? WHERE user=?`,[req.query.passw,req.query.email,req.query.quota,req.params.username],(err,res) => {
							if (err) {
							  console.log("error: ", err);
							  result(err, null);
							  return;
							}
			});
			}
			res.send("Succesful");
		}
		else res.status(401).send("Not authorized");

  });
    
  app.post("/energy/api/Admin/:table",function(req,res){
 	  const correct =await getResults(req.user.apikey);
  	  console.log(correct);
	  if (correct==1){
		  sql.query(`LOAD DATA LOCAL INFILE ? CHARACTER SET UTF8 INTO TABLE ?  FIELDS TERMINATED BY ';' LINES TERMINATED BY '\r\n' IGNORE 1 LINES; `,[csvfile,table],(err,res) => {
							if (err) {
							  console.log("error: ", err);
							  result(err, null);
							  return;
							}
			});
	 }
	 else res.status(401).send("Not authorized");

  });
   
  app.get("/energy/api/ActualTotalLoad/:AreaName/:Resolution/date/:Year-:Month-:Day", entry.findTwo);
  
  app.get("/energy/api/ActualTotalLoad/:AreaName/:Resolution/month/:Year-:Month", entry.findThree);
  
  app.get("/energy/api/ActualTotalLoad/:AreaName/:Resolution/year/:Year", entry.findFour);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/AllTypes/:Resolution/date/:Year-:Month-:Day", entry.findEight);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/AllTypes/:Resolution/month/:Year-:Month", entry.findNine);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/AllTypes/:Resolution/year/:Year", entry.findTen);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/:ProductionType/:Resolution/date/:Year-:Month-:Day", entry.findFive);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/:ProductionType/:Resolution/month/:Year-:Month", entry.findSix);
  
  app.get("/energy/api/AggregatedGenerationPerType/:AreaName/:ProductionType/:Resolution/year/:Year", entry.findSeven);
  
  app.get("/energy/api/DayAheadTotalLoadForecast/:AreaName/:Resolution/date/:Year-:Month-:Day", entry.findEleven);
  
  app.get("/energy/api/DayAheadTotalLoadForecast/:AreaName/:Resolution/month/:Year-:Month", entry.findTwelve);
  
  app.get("/energy/api/DayAheadTotalLoadForecast/:AreaName/:Resolution/year/:Year", entry.findThirteen);
  
  app.get("/energy/api/ActualvsForecast/:AreaName/:Resolution/date/:Year-:Month-:Day", entry.findFourteen);
  
  app.get("/energy/api/ActualvsForecast/:AreaName/:Resolution/month/:Year-:Month", entry.findFifteen);
  
  app.get("/energy/api/ActualvsForecast/:AreaName/:Resolution/year/:Year", entry.findSixteen);
  
  app.get('*', function(req, res){
  	res.status(400).send('Error 400: Bad Request');
  });
	  
};
