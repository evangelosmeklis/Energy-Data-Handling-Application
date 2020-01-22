import cli from 'cli-ux'
// just prompt for input
import {Command} from '@oclif/command'
import {createConnection} from "typeorm";
import {flags} from  '@oclif/command'
const bcrypt = require('bcrypt');
const axios=require('axios');

export class AdminCommand extends Command {
  static flags = { 
    newuser: flags.string({dependsOn:['passw'],exclusive:['newdata','userstatus','moduser']}),
    moduser: flags.string({dependsOn:['passw'],exclusive:['newuser','newdata','userstatus']}),
    passw: flags.string({dependsOn:['email']}),
    email: flags.string({dependsOn:['quota']}),
    quota: flags.string(),
    userstatus: flags.string({exclusive:['newdata','newuser','moduser']}),
    newdata: flags.string({dependsOn:['source'],exclusive:['newdata','newuser','moduser']}),
    source: flags.string()
  }
  async run() {
    const {flags} = this.parse(AdminCommand); 
	var fs=require('fs');
	var privateKey = fs.readFileSync('private.key');
	var jwt=require('jsonwebtoken');
	var token = fs.readFileSync('softeng19bAPI.token');
	axios.defaults.headers.common['Authorization']="Bearer " + token;
	await cli.anykey();
	//create new user
	if (`${flags.newuser}` !== "undefined" && `${flags.passw}` !== "undefined" && `${flags.email}` !== "undefined" && `${flags.quota}` !== "undefined" ){
			let hash = bcrypt.hashSync(`${flags.passw}`,10);
			await axios.post('https://localhost:8765/energy/api/Admin/users?username=' +`${flags.newuser}` +'&passw=' + hash +'&email=' + `${flags.email}`  +'&quota=' + `${flags.quota}`);
				
	}
	//modify user
	else if (`${flags.moduser}` !== "undefined" && `${flags.passw}` !== "undefined" && `${flags.email}` !== "undefined" && `${flags.quota}` !== "undefined" ){
		let hash = bcrypt.hashSync(`${flags.passw}`,10);
		await axios.post('https://localhost:8765/energy/api/Admin/users?username=' +`${flags.newuser}` +'&passw=' + hash +'&email=' + `${flags.email}`  +'&quota=' + `${flags.quota}`);
	}
	//get userstatus
	else if (`${flags.userstatus}` !== "undefined" && `${flags.passw}` == "undefined"){
		await 	axios.get('https://localhost:8765/energy/api/Admin/users/' +`${flags.userstatus}`);		   			
	}
	else if (`${flags.userstatus}` !== "undefined" && `${flags.passw}` !== "undefined" && `${flags.email}` !== "undefined" && `${flags.quota}` !== "undefined"){
		let hash = bcrypt.hashSync(`${flags.passw}`,10);
		await 	axios.put('https://localhost:8765/energy/api/Admin/users/' +`${flags.userstatus}`+'?passw=' + hash +'&email=' + `${flags.email}`  +'&quota=' + `${flags.quota}`);		   		
	}
	//insert new data
	else if (`${flags.newdata}` !== "undefined" && `${flags.source}` !== "undefined" ){
		await 	axios.post('https://localhost:8765/energy/api/Admin/' +`${flags.newdata}` + '?' + `${flags.source}`);		   
	}
	else console.log("Unsuccesful" + `${flags.newuser}`,`${flags.pass}`,`${flags.email}`,`${flags.quota}`);
    }
}

