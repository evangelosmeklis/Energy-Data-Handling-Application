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
  		var fs=require('fs');
		fs.writeFileSync("temptoken.txt"," ");	
  }
}
