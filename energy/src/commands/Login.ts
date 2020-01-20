import Command from '@oclif/command'
import axios from 'axios'
import {flags} from  '@oclif/command'
const bcrypt = require('bcrypt');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
export class LoginCommand extends Command {
  static flags = { 
    user: flags.string({dependsOn:['passw']}),
    //email: flags.string({dependsOn:['passw'],exlucsive:['user']}),
    passw: flags.string()
  }
  
  async run() {
  		const {flags} = this.parse(LoginCommand); 
  		var mysql=require('mysql')
		var connection=mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: 'Vangelis98!',
			database: 'vag'
		});
		connection.connect();
		await connection.query(`SELECT user,pass,email,quota,apikey,privileges FROM users WHERE user=?`,[`${flags.user}`], function (err, result, fields) {
    			if (err) throw err;
    			//console.log(`${flags.user}`);
    			//console.log(result[0].pass);
    			var u=result[0].user;
    			var p=result[0].pass;
    			var e=result[0].email;
    			var q=result[0].quota;
    			var a=result[0].apikey;
    			var p=result[0].privileges;
   		 		const password=result[0].pass;
   		 		if(bcrypt.compareSync(`${flags.passw}`, password)) {
   		 			var fs=require('fs');
					var privateKey = fs.readFileSync('private.key');
					var jwt=require('jsonwebtoken');
					var token = jwt.sign({user:`${flags.user}`,passw:`${flags.passw}`,email: e, quota: q,apikey: a,privileges: p }, privateKey, { algorithm: 'RS256' });
					fs.writeFileSync("temptoken.txt",token);
				} else {
				 	console.log("Wrong username or password\n");
				}		
 		 });
 	  	connection.end();
  }
}
