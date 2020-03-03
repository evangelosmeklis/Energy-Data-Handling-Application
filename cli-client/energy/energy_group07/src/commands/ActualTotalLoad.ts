import Command from '@oclif/command'
import axios from 'axios'
import {flags} from  '@oclif/command'
var fs=require('fs');
const https = require('https')
const client_cert = fs.readFileSync('ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert, keepAlive: true})

export class ActualTotalLoadCommand extends Command {
  static flags = { 
    area: flags.string({multiple: true}),
    timeres: flags.string({options:['PT15M','PT30M','PT60M']}),
    date: flags.string(),
    month: flags.string(),
    year: flags.string(),
    format: flags.string({options:['json','csv']})
  }
  async run() {
	const axios = require('axios');
	const {flags} = this.parse(ActualTotalLoadCommand); 
	var fs=require('fs');
	var token = fs.readFileSync('softeng19bAPI.token','utf-8');
	//console.log(token); to be erased
	
	const moment=require('moment');
	if(`${flags.date}` !== "undefined" && !(moment(`${flags.date}`, 'YYYY-MM-DD',true).isValid())) throw new Error("Wrong date format");
	else if(`${flags.month}` !== "undefined" && !(moment(`${flags.month}`, 'YYYY-MM',true).isValid())) throw new Error("Wrong date format");
	else if(`${flags.year}` !== "undefined" && !(moment(`${flags.year}`, 'YYYY',true).isValid())) throw new Error("Wrong date format");
	
	axios.defaults.headers.common['X-OBSERVATORY-AUTH']=token;
	//console.log(`${flags.area}`,`${flags.timeres}`,`${flags.date}`,`${flags.format}`);
	if (`${flags.date}` !== "undefined"){
	 var splitted = `${flags.date}`.split("-", 3); 
	 if (`${flags.format}`== "undefined" || `${flags.format}`=="json"){
	 const data= await axios.get('https://localhost:8765/energy/api/ActualTotalLoad/' +`${flags.area}` +'/' + `${flags.timeres}` +'/date/' + splitted[0] +'-' + splitted[1] + '-' + splitted[2]);
	 	 console.log(data.data);
	 }
	 else if (`${flags.format}`=="csv") {
	 	 const data= await axios.get('https://localhost:8765/energy/api/ActualTotalLoad/' +`${flags.area}` +'/' + `${flags.timeres}` +'/date/' + splitted[0] +'-' + splitted[1] + '-' + splitted[2]+ "?format=" + `${flags.format}`);
	 	 console.log(data.data);
	 }
	 else console.log("Error 400: Bad Request");

	}

	else if (`${flags.month}`!=="undefined"){
	 	 var splitted = `${flags.month}`.split("-", 2); 
	 	 	 if (`${flags.format}`== "undefined" || `${flags.format}`=="json"){
	 const data= await axios.get('https://localhost:8765/energy/api/ActualTotalLoad/' +`${flags.area}` +'/' + `${flags.timeres}` +'/month/' + splitted[0] +'-' + splitted[1]);
	 			 console.log(data.data);
	 		}

	 	 else if (`${flags.format}`=="csv") {
	 	 const data= await axios.get('https://localhost:8765/energy/api/ActualTotalLoad/' +`${flags.area}` +'/' + `${flags.timeres}` +'/month/' + splitted[0] +'-' + splitted[1] + "?format=" + `${flags.format}`);
	 	 console.log(data.data);
	    }
	    
	    else console.log("Error 400: Bad Request");
	}
	
	else if (`${flags.year}`!=="undefined"){
	 if (`${flags.format}`== "undefined" || `${flags.format}`=="json"){
	 const data= await axios.get('https://localhost:8765/energy/api/ActualTotalLoad/' +`${flags.area}` +'/' + `${flags.timeres}` +'/year/' +`${flags.year}`);
	 console.log(data.data);
	 }
	 
	 else if (`${flags.format}`=="csv") {
	 	 const data= await axios.get('https://localhost:8765/energy/api/ActualTotalLoad/' +`${flags.area}` +'/' + `${flags.timeres}` +'/year/' + `${flags.year}` + "?format=" + `${flags.format}`);
	 	 console.log(data.data);
	    }
	  
	 else console.log("Error 400: Bad Request");
	}
	
	else console.log("Error 400: Bad Request");
	
	/*console.log('https://localhost:8765/energy/api/ActualTotalLoad/' +`${flags.area}` +'/' + `${flags.timeres}` +'/date/' +`${flags.Year}` +'-' + `${flags.Month}` + '-' + `${flags.Day}`);
	console.log(`${flags.area}`,`${flags.timeres}`,`${flags.Year}`,`${flags.Month}`,`${flags.Day}`);*/
  } 
}
