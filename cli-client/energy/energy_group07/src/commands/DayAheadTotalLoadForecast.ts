import Command from '@oclif/command'
import axios from 'axios'
import {flags} from '@oclif/command'
var fs=require('fs');
const https = require('https')
const client_cert = fs.readFileSync('ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert, keepAlive: true})
export class ForecastCommand extends Command {
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
	const {flags} = this.parse(ForecastCommand); 
	//console.log(`${flags.format}`);
	var fs=require('fs');
	var token = fs.readFileSync('softeng19bAPI.token','utf-8');
	axios.defaults.headers.common['X-OBSERVATORY-AUTH']=token;
	
	const moment=require('moment');
	if(`${flags.date}` !== "undefined" && !(moment(`${flags.date}`, 'YYYY-MM-DD',true).isValid())) throw new Error("Wrong date format");
	else if(`${flags.month}` !== "undefined" && !(moment(`${flags.month}`, 'YYYY-MM',true).isValid())) throw new Error("Wrong date format");
	else if(`${flags.year}` !== "undefined" && !(moment(`${flags.year}`, 'YYYY',true).isValid())) throw new Error("Wrong date format");
	
	
	if (`${flags.date}` !== "undefined"){
	 var splitted = `${flags.date}`.split("-", 3); 
	 console.log('https://localhost:8765/energy/api/DayAheadTotalLoadForecast/' +`${flags.area}` +'/' + `${flags.timeres}` +'/date/' + splitted[0] +'-' + splitted[1] + '-' + splitted[2]+ "?format=" + `${flags.format}`);
	 if (`${flags.format}`== "undefined" || `${flags.format}`=="json"){
	 const data= await axios.get('https://localhost:8765/energy/api/DayAheadTotalLoadForecast/' +`${flags.area}` +'/' + `${flags.timeres}` +'/date/' + splitted[0] +'-' + splitted[1] + '-' + splitted[2]);
	 	 console.log(data.data);
	 }
	 else if (`${flags.format}`=="csv") {
	 	 const data= await axios.get('https://localhost:8765/energy/api/DayAheadTotalLoadForecast/' +`${flags.area}` +'/' + `${flags.timeres}` +'/date/' + splitted[0] +'-' + splitted[1] + '-' + splitted[2]+ "?format=" + `${flags.format}`);
	 	 console.log(data.data);
	 }
	 else console.log("Error 400: Bad Request");

	}

	else if (`${flags.month}` !=="undefined"){
	 	 var splitted = `${flags.month}`.split("-", 2); 
	 	 	 if (`${flags.format}`== "undefined" || `${flags.format}`=="json"){
	 const data= await axios.get('https://localhost:8765/energy/api/DayAheadTotalLoadForecast/' +`${flags.area}` +'/' +  `${flags.timeres}` +'/month/' + splitted[0] +'-' + splitted[1]);
	 			 console.log(data.data);
	 		}

	 	 else if (`${flags.format}`=="csv") {
	 	 const data= await axios.get('https://localhost:8765/energy/api/DayAheadTotalLoadForecast/' +`${flags.area}` +'/' + `${flags.timeres}` +'/month/' + splitted[0] +'-' + splitted[1] + "?format=" + `${flags.format}`);
	 	 console.log(data.data);
	    }
	    
	    else console.log("Error 400: Bad Request");
	}
	
	else if (`${flags.year}` !== "year"){
	 if (`${flags.format}`== "undefined" || `${flags.format}`=="json"){
	 const data= await axios.get('https://localhost:8765/energy/api/DayAheadTotalLoadForecast/' +`${flags.area}` +'/'  + `${flags.timeres}` +'/year/' +`${flags.year}`);
	 console.log(data.data);
	 }
	 
	 else if (`${flags.format}`=="csv") {
	 	 const data= await axios.get('https://localhost:8765/energy/api/DayAheadTotalLoadForecast/' +`${flags.area}` +'/'  + `${flags.timeres}` +'/year/' + `${flags.year}` + "?format=" + `${flags.format}`);
	 	 console.log(data.data);
	    }
	  
	 else console.log("Error 400: Bad Request");
	}
	
	else console.log("Error 400: Bad Request");
	
	
  } 
}
