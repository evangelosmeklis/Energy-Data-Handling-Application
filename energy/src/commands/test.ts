import {Command} from '@oclif/command'
import axios from 'axios';
export class TestCommand extends Command {
  async run() {
	const axios = require('axios');

	const data= await axios.get('http://localhost:8765/energy/api/ActualvsForecast/Slovakia/PT60M/date/2018-01-04')
	console.log(data.data);
  }
}
