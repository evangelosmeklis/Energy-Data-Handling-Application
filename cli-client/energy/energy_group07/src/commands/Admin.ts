import cli from 'cli-ux'
// just prompt for input
import {Command} from '@oclif/command'
import {createConnection} from "typeorm";
import {flags} from  '@oclif/command'
const bcrypt = require('bcrypt');
var fs=require('fs');
const https = require('https')
const axios=require('axios');
const client_cert = fs.readFileSync('ca-crt.pem')
var colors = require('colors');
axios.defaults.httpsAgent = new https.Agent({ca : client_cert, keepAlive: true})
export class AdminCommand extends Command {
  static flags = { 
    newuser: flags.string({dependsOn:['passw'],exclusive:['newdata','userstatus','moduser']}),
    moduser: flags.string({dependsOn:['passw'],exclusive:['newuser','newdata','userstatus']}),
    passw: flags.string({dependsOn:['email']}),
    email: flags.string({dependsOn:['quota']}),
    quota: flags.string(),
    userstatus: flags.string({exclusive:['newdata','newuser','moduser']}),
    newdata: flags.string({dependsOn:['source'],exclusive:['userstatus','newuser','moduser']}),
    source: flags.string()
  }
  async run() {
    const {flags} = this.parse(AdminCommand); 
	var fs=require('fs');
	var jwt=require('jsonwebtoken');
	var token = fs.readFileSync('softeng19bAPI.token','utf-8');
	axios.defaults.headers.common['X-OBSERVATORY-AUTH']=token;
	//await cli.anykey();
	//create new user
	if (`${flags.newuser}` !== "undefined" && `${flags.passw}` !== "undefined" && `${flags.email}` !== "undefined" && `${flags.quota}` !== "undefined" ){
			let hash = bcrypt.hashSync(`${flags.passw}`,10);
			let body = new Object ({
				username: `${flags.newuser}`,
				passw: `${flags.passw}`,
				email: `${flags.email}`,
				quota: `${flags.quota}` 
			})
			await axios.post('https://localhost:8765/energy/api/Admin/users',body);
			console.log("User inserted succesfully");
				
	}
	
	//modify user
	else if (`${flags.moduser}` !== "undefined" && `${flags.passw}` !== "undefined" && `${flags.email}` !== "undefined" && `${flags.quota}` !== "undefined" ){
		let body = new Object ({
				username: `${flags.moduser}`,
				passw: `${flags.passw}`,
				email: `${flags.email}`,
				quota: `${flags.quota}` 
		})
		await axios.put('https://localhost:8765/energy/api/Admin/users/' +`${flags.moduser}`,body);
		console.log('User modified succesfully');
	}
	
	
	//get userstatus
	else if (`${flags.userstatus}` !== "undefined"){
		const data=await axios.get('https://localhost:8765/energy/api/Admin/users/' +`${flags.userstatus}`);	
		console.log(data.data);
	}

	
	//insert new data
	else if (`${flags.newdata}` !== "undefined" && `${flags.source}` !== "undefined" ){
		var csv=require('csv-parser');
		var FormData=require('form-data');
		const form_data = new FormData();
		var data = [];
		form_data.append("file", fs.createReadStream(`${flags.source}`));
		form_data.pipe(csv()).on('data',function(row:any){ data.push(row) }).on('end',function(){console.log('Data Loaded')});
		let header = form_data.getHeaders();
		const config = {
			method: 'POST',
			port:8765,
			headers: {
				"x-observatory-auth":token,
				header
			},
 			maxContentLength:524228890
		};

		return await axios.post('https://localhost:8765/energy/api/Admin/' + `${flags.newdata}`, form_data,config);
	}
	else console.log("Unsuccesful" + `${flags.newuser}`,`${flags.passw}`,`${flags.email}`,`${flags.quota}`);  
  }
}






