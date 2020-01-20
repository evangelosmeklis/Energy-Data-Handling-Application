import Command from '@oclif/command'
import axios from 'axios'
import {flags} from '@oclif/command'
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
export class ForecastCommand extends Command {
   static flags = {
    area: flags.string({multiple: true}),
    timeres: flags.string(),
    date: flags.string(),
    month: flags.string(),
    year: flags.string(),
    format: flags.string()
  }
  async run() {

	const axios = require('axios');
	const {flags} = this.parse(ForecastCommand); 
	//console.log(`${flags.format}`);
	var fs=require('fs');
	var token = fs.readFileSync('temptoken.txt');
	axios.defaults.headers.common['Authorization']=token;
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
