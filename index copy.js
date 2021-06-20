/* eslint-disable no-mixed-spaces-and-tabs */
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');

const dotenv = require('dotenv');
dotenv.config();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(' ');
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.channel.send('Pong.');

	}
	 else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		else if (args[0] === 'foo') {
			return message.channel.send('bar');
		}

		message.channel.send(`First argument: ${args[0]}`);
	}
	else if (command === 'beep') {
		message.channel.send('Boop.');
	}
	else if (command === 'server') {
		message.channel.send(`This server's name is: ${message.guild.name}`);
	}
	else if (command === 'user-info') {
		message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
	}
	else if (command === 'reaction') {
		message.react('👍').then(() => message.react('👎'));

		const filter = (reaction, user) => {
	        return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id;
		};

		message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	        .then(collected => {
		    const reaction = collected.first();

		    if (reaction.emoji.name === '👍') {
					message.reply('you reacted with a thumbs up.');
	    	}
				else {
					message.reply('you reacted with a thumbs down.');
		    }
	        })
	    .catch(collected => {
		    message.reply('you reacted with neither a thumbs up, nor a thumbs down.');
	    });
	}
});

client.login(token);