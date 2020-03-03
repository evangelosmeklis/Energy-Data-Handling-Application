module.exports= function isloggedin(req,res,next){
	const fs=require("fs");
	const sql = require("../models/db.js");
	const token =  req.headers['x-observatory-auth'];
	var privateKey = fs.readFileSync('private.key');
	var jwt=require('jsonwebtoken');
	//console.log(token);
    const decoded = jwt.verify(token, privateKey);
	const tempquota= fs.readFileSync('tempquota.txt','utf-8');
    if(decoded.quota<=0) {
    	return res.status(402).send("Out of quota");
    }
    else if (decoded.privileges !== 'superuser'){
    	const newquota=decoded.quota-1
    	fs.writeFileSync('tempquota.txt',newquota);
    	sql.query(`UPDATE users SET quota=? WHERE user=?`,[newquota,decoded.user],(err,res) => {
							if (err) {
							  console.log("error: ", err);
							  result(err, null);
							  return;
							}
			});
	}
}
