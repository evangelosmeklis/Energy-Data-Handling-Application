import Command from '@oclif/command'
import axios from 'axios'
import {flags} from  '@oclif/command'
const bcrypt = require('bcrypt');
var fs=require('fs');
const https = require('https')
var colors = require('colors');
const client_cert = fs.readFileSync('ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert, keepAlive: true})

export class LogoutCommand extends Command {
  async run() {
  		var fs=require('fs');
  		var jwt=require('jsonwebtoken');
		var token = fs.readFileSync('softeng19bAPI.token');
		axios.defaults.headers.common['X-OBSERVATORY-AUTH']=token;
  		const result=await axios.post('https://localhost:8765/energy/api/Logout');
  		//console.log(result);
  		fs.writeFileSync('softeng19bAPI.token',result.data);
  		console.log("Successfully Logged out");
  	
  }
}
