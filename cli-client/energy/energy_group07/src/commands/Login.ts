import Command from '@oclif/command'
import axios from 'axios'
import {flags} from  '@oclif/command'
const bcrypt = require('bcrypt');
var fs=require('fs');
const https = require('https')
var colors = require('colors');
const client_cert = fs.readFileSync('ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert, keepAlive: true})

export class LoginCommand extends Command {
  static flags = { 
    username: flags.string({dependsOn:['passw']}),
    passw: flags.string()
  }
  
  async run() {
  		const {flags} = this.parse(LoginCommand); 
  		var fs=require('fs');
  		var jwt=require('jsonwebtoken');
  		var check1=fs.readFileSync('softeng19bAPI.token','utf8');
  		var check2=check1.toString();
  		if (check2 !== 'empty') { console.log("Unfortunately another user is logged in right now. You will have to wait.");}
  		else { 
  			let data = {
  				username: `${flags.username}`,
  				passw: `${flags.passw}`
  			}
  			const user=await axios.post('https://localhost:8765/energy/api/Login',data);
  			let token=JSON.stringify(user.data.token)
  			fs.writeFileSync('softeng19bAPI.token',token.replace(/"/g,''),'utf-8');
  			console.log("Successfully logged in");
  		}
  }
}
