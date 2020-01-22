import Command from '@oclif/command'
import axios from 'axios'
import {flags} from  '@oclif/command'
const bcrypt = require('bcrypt');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
export class LogoutCommand extends Command {
  async run() {
  		var fs=require('fs');
  		var jwt=require('jsonwebtoken');
  		var privateKey = fs.readFileSync('private.key');
		var token = fs.readFileSync('softeng19bAPI.token');
		axios.defaults.headers.common['Authorization']="Bearer " + token;
  		const result=await axios.post('https://localhost:8765/energy/api/Logout');
  		//console.log(result);
  		fs.writeFileSync('softeng19bAPI.token',result.data);
  	
  }
}
