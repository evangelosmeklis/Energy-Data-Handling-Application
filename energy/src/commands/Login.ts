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
  		var fs=require('fs');
  		var jwt=require('jsonwebtoken');
  		var privateKey = fs.readFileSync('private.key');
  		const token=await axios.post('https://localhost:8765/energy/api/Login?username=' +`${flags.user}` +'&passw=' + `${flags.passw}`);
  		//console.log(token);
  		jwt.verify(token,privateKey,function(err,decoded){
  			fs.writeFileSync('softeng19bAPI.token',token.data);
  		});
  }
}
