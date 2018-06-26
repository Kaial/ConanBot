const Discord = require('discord.js');
require('./config.js');

var listen = false;
const client = new Discord.Client();
const CMD_PREFIX = "!";
var conanNames = ['conan', 'conanbot', 'Conan', 'ConanBot'];
var responses = {};

client.on('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if(message.author.bot){
        console.log('ignoring bot message')
        return;
    }
    if(listen){
        //someone triggerd conan to listen to them
        listen = false;
        var c = responses[message.content];
        console.log('content contains:' + c + 'content is ' + c);
        if (responses[message.content] === '' || responses[message.content] === null|| responses[message.content] === undefined) {
		if(message.content === 'what is best in life?'){
			return message.reply('To crush your enemies. See them driven before you. And to hear the lamentations of their women.');
		}
            return message.reply("I don't understand.");
            
        }else{
            return message.channel.send(responses[message.content]);
        }        
    } 
    if(message.content.startsWith(CMD_PREFIX)){
        //a command prefix has been requested of conan bot. Lets figure out what command it is. 
        const input = message.content.slice(CMD_PREFIX.length).split(' ');
        const command = input.shift();
        const commandArgs = input.join(' ');
        if(command === 'teach'){
            var splitArgs = commandArgs.split(' ');
            var responseTag = splitArgs.shift();
            var response = splitArgs.join(' ');
            responses[responseTag] = response;
            return message.reply('I learned to respond to' + responseTag + ' with ' + response);            
        }
        if(command === 'forget'){
            //ask conan to forget a command he has learned. 
        }
    }
    
    for(var i = 0; i < conanNames.length; i++){
        if(message.content.startsWith(conanNames[i])){
            //someone is trying to talk to conan.
            message.channel.send("WHAT!?");
            listen = true;    
            console.log('conan is listening');        
        }        
    }       
});
client.login(Config.LoginKey);
