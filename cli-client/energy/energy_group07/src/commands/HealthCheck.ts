import Command from '@oclif/command'
import axios from 'axios'
import {flags} from  '@oclif/command'
var fs=require('fs');
const https = require('https')
const client_cert = fs.readFileSync('ca-crt.pem')
axios.defaults.httpsAgent = new https.Agent({ca : client_cert, keepAlive: true})

export class ActualTotalLoadCommand extends Command {
  async run() {
	const axios = require('axios');
	var fs=require('fs');
    const data= await axios.get('https://localhost:8765/energy/api/HealthCheck');
	console.log(data.data);
  }
}
 
