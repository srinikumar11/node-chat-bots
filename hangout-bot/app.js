// Hangout chat connector
var hangoutsBot = require("hangouts-bot");

//read from console input
var readline = require('readline');

// config
var config = require("./config.json");


var bot = new hangoutsBot(config.email, config.password);

bot.on('online', function() {
    console.log('online');
});

bot.on('message', function(from, message) {
    console.log(from + ">> " + message);
	reply(from);
});

var reply = function(from){
	var rl = readline.createInterface(process.stdin, process.stdout);
	rl.setPrompt('reply >>> ');
	rl.prompt();
	rl.on('line', function(line) {
		if (line == 'bye') {
			process.exit(0);
		}
		bot.sendMessage(from, line);
		if(line == ""){
			rl.prompt();
		}
	}).on('close',function(){
	    process.exit(0);
	});
}
