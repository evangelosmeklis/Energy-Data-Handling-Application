module.exports= function isloggedin(req,res,next){
	const fs=require("fs");
	const sql = require("../models/db.js");
	const token =  req.headers['x-observatory-auth'];
	var privateKey = fs.readFileSync('private.key');
	var jwt=require('jsonwebtoken');
	//console.log(token);
    const decoded = jwt.verify(token, privateKey);
    //console.log(token);
    //console.log(decoded.privileges);
	const tempquota= fs.readFileSync('tempquota.txt','utf-8');
    if(decoded.privileges !== 'superuser') {
    	return res.status(401).send({message:"Not authorized"});
    }
    else next();
}
