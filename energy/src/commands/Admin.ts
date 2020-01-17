import cli from 'cli-ux'
// just prompt for input
import {Command} from '@oclif/command'
import {createConnection} from "typeorm";
import {flags} from  '@oclif/command'

export class AdminCommand extends Command {
  static flags = { 
    newuser: flags.string({dependsOn:['passw'],exclusive:['moduser']}),
    moduser: flags.string({dependsOn:['passw'],exclusive:['newuser']}),
    passw: flags.string({dependsOn:['email']}),
    email: flags.string({dependsOn:['quota']}),
    quota: flags.string(),
    userstatus: flags.string(),
    newdata: flags.string({dependsOn:['source']}),
    source: flags.string()
  }
  async run() {
    var mysql=require('mysql')
    var connection=mysql.createConnection({
    	host: 'localhost',
    	user: 'root',
    	password: 'Vangelis98!',
    	database: 'vag'
    });
    
    connection.connect();
    
    const {flags} = this.parse(AdminCommand); 

	var username= await cli.prompt('Please Enter Username')
	if (username=="superuser"){
	// mask input on keypress (before enter is pressed)
		var pass=await cli.prompt('Please Enter Password?', {type: 'hide'})
		if (pass=="ntua_softeng"){
		    await cli.anykey();
			if (`${flags.newuser}` !== "undefined" && `${flags.passw}` !== "undefined" && `${flags.email}` !== "undefined" && `${flags.quota}` !== "undefined" ){
			    //console.log("inside");
				await connection.query(`INSERT INTO users VALUES (?,?,?,?)`,[`${flags.newuser}`,`${flags.passw}`,`${flags.email}`,`${flags.quota}`]);
				console.log("Succesful");
			}
			else console.log("Unsuccesful" + `${flags.newuser}`,`${flags.pass}`,`${flags.email}`,`${flags.quota}`);
		}
		else console.log("Wrong password");
    }
   else console.log("Wrong username");
  }
}

