import Command from '@oclif/command'
import axios from 'axios'

export class ActualvsForecastCommand extends Command {
  static args = [
  	{name: 'Area', required: true},
    {name: 'AreaName', required : true},
    {name: 'timeres', required: true},
    {name: 'Resolution', required: true},
    {name: 'dateformat', required: true},
    {name: 'dateinput', required: true},
    {name: 'beforeformat', required: false},
    {name: 'format' , required: false}
  ]
  async run() {

	const axios = require('axios');
	const {args} = this.parse(ActualvsForecastCommand); 
	//console.log(`${args.format}`);
	if (`${args.dateformat}`=='--date'){
	 var splitted = `${args.dateinput}`.split("-", 3); 
	 console.log('http://localhost:8765/energy/api/ActualvsForecast/' +`${args.AreaName}` +'/' + `${args.Resolution}` +'/date/' + splitted[0] +'-' + splitted[1] + '-' + splitted[2]+ "/format=" + `${args.format}`);
	 if (`${args.format}`== "undefined" || `${args.format}`=="json"){
	 const data= await axios.get('http://localhost:8765/energy/api/ActualvsForecast/' +`${args.AreaName}` +'/' + `${args.Resolution}` +'/date/' + splitted[0] +'-' + splitted[1] + '-' + splitted[2]);
	 	 console.log(data.data);
	 }
	 else if (`${args.format}`=="csv") {
	 	 const data= await axios.get('http://localhost:8765/energy/api/ActualvsForecast/' +`${args.AreaName}` +'/' + `${args.Resolution}` +'/date/' + splitted[0] +'-' + splitted[1] + '-' + splitted[2]+ "/format=" + `${args.format}`);
	 	 console.log(data.data);
	 }
	 else console.log("Error 400: Bad Request");

	}

	else if (`${args.dateformat}`=='--month'){
	 	 var splitted = `${args.dateinput}`.split("-", 2); 
	 	 	 if (`${args.format}`== "undefined" || `${args.format}`=="json"){
	 const data= await axios.get('http://localhost:8765/energy/api/ActualvsForecast/' +`${args.AreaName}` +'/' +  `${args.Resolution}` +'/month/' + splitted[0] +'-' + splitted[1]);
	 			 console.log(data.data);
	 		}

	 	 else if (`${args.format}`=="csv") {
	 	 const data= await axios.get('http://localhost:8765/energy/api/ActualvsForecast/' +`${args.AreaName}` +'/' + `${args.Resolution}` +'/month/' + splitted[0] +'-' + splitted[1] + "/format=" + `${args.format}`);
	 	 console.log(data.data);
	    }
	    
	    else console.log("Error 400: Bad Request");
	}
	
	else if (`${args.dateformat}`=='--year'){
	 if (`${args.format}`== "undefined" || `${args.format}`=="json"){
	 const data= await axios.get('http://localhost:8765/energy/api/ActualvsForecast/' +`${args.AreaName}` +'/'  + `${args.Resolution}` +'/year/' +`${args.dateinput}`);
	 console.log(data.data);
	 }
	 
	 else if (`${args.format}`=="csv") {
	 	 const data= await axios.get('http://localhost:8765/energy/api/ActualvsForecast/' +`${args.AreaName}` +'/'  + `${args.Resolution}` +'/year/' + `${args.dateinput}` + "/format=" + `${args.format}`);
	 	 console.log(data.data);
	    }
	  
	 else console.log("Error 400: Bad Request");
	}
	
	else console.log("Error 400: Bad Request");
	
	
  } 
}
