import cli from 'cli-ux'
// just prompt for input
import {Command} from '@oclif/command'
export class AdminCommand extends Command {
  static args = [
  	{name: 'newbefore', required: false},
  	{name: 'newuser', required: false},
  	{name: 'modbefore', required : false},
    {name: 'moduser', required: false},
  	{name: 'password', required: false},
  	{name: 'email', required: true},
  	{name: 'quota', required: true}   
  ]
  async run() {
	await cli.prompt('Please Enter Username')
    
	// mask input on keypress (before enter is pressed)
	await cli.prompt('Please Enter Password?', {type: 'hide'})

	// "press any key to continue"
	await cli.anykey()
  }
}

