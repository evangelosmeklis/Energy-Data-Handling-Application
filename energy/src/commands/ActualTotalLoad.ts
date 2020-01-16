import Command from '@oclif/command'
import axios from 'axios';

export class ActualTotalLoadCommand extends Command {
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
	const {args} = this.parse(ActualTotalLoadCommand); 
	//console.log(`${args.format}`);
	if (`${args.dateformat}`=='--date'){
	 var splitted = `${args.dateinput}`.split("-", 3); 
	 if (`${args.format}`== "undefined" || `${args.format}`=="json"){
	 const data= await axios.get('http://localhost:8765/energy/api/ActualTotalLoad/' +`${args.AreaName}` +'/' + `${args.Resolution}` +'/date/' + splitted[0] +'-' + splitted[1] + '-' + splitted[2]);
	 	 console.log(data.data);
	 }
	 else if (`${args.format}`=="csv") {
	 	 const data= await axios.get('http://localhost:8765/energy/api/ActualTotalLoad/' +`${args.AreaName}` +'/' + `${args.Resolution}` +'/date/' + splitted[0] +'-' + splitted[1] + '-' + splitted[2]+ "/format=" + `${args.format}`);
	 	 console.log(data.data);
	 }
	 else console.log("Error 400: Bad Request");

	}

	else if (`${args.dateformat}`=='--month'){
	 	 var splitted = `${args.dateinput}`.split("-", 2); 
	 	 	 if (`${args.format}`== "undefined" || `${args.format}`=="json"){
	 const data= await axios.get('http://localhost:8765/energy/api/ActualTotalLoad/' +`${args.AreaName}` +'/' + `${args.Resolution}` +'/month/' + splitted[0] +'-' + splitted[1]);
	 			 console.log(data.data);
	 		}

	 	 else if (`${args.format}`=="csv") {
	 	 const data= await axios.get('http://localhost:8765/energy/api/ActualTotalLoad/' +`${args.AreaName}` +'/' + `${args.Resolution}` +'/month/' + splitted[0] +'-' + splitted[1] + "/format=" + `${args.format}`);
	 	 console.log(data.data);
	    }
	    
	    else console.log("Error 400: Bad Request");
	}
	
	else if (`${args.dateformat}`=='--year'){
	 if (`${args.format}`== "undefined" || `${args.format}`=="json"){
	 const data= await axios.get('http://localhost:8765/energy/api/ActualTotalLoad/' +`${args.AreaName}` +'/' + `${args.Resolution}` +'/year/' +`${args.dateinput}`);
	 console.log(data.data);
	 }
	 
	 else if (`${args.format}`=="csv") {
	 	 const data= await axios.get('http://localhost:8765/energy/api/ActualTotalLoad/' +`${args.AreaName}` +'/' + `${args.Resolution}` +'/year/' + `${args.dateinput}` + "/format=" + `${args.format}`);
	 	 console.log(data.data);
	    }
	  
	 else console.log("Error 400: Bad Request");
	}
	
	else console.log("Error 400: Bad Request");
	
	/*console.log('http://localhost:8765/energy/api/ActualTotalLoad/' +`${args.AreaName}` +'/' + `${args.Resolution}` +'/date/' +`${args.Year}` +'-' + `${args.Month}` + '-' + `${args.Day}`);
	console.log(`${args.AreaName}`,`${args.Resolution}`,`${args.Year}`,`${args.Month}`,`${args.Day}`);*/
  } 
}
