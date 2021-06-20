/* eslint-disable no-var */
/* eslint-disable no-mixed-spaces-and-tabs */
const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, token } = require('./config.json');
var osc = require('osc');

var udpPort = new osc.UDPPort({
	localAddress: '127.0.0.1',
	localPort: 57121,
	metadata: true
});

// Listen for incoming OSC messages.
udpPort.on('message', function(oscMsg, timeTag, info) {
	console.log('An OSC message just arrived!', oscMsg);
	console.log('Remote info is: ', info);
});

// Open the socket.
udpPort.open();

const dotenv = require('dotenv');
dotenv.config();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {
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
	else if (command === 'p1up') {
		message.channel.send('Player 1 moved 1 squared up!');
		udpPort.send({
			address: '/cue/1_1/start',
		}, '127.0.0.1', 53000);
	}
	else if (command === 'p1down') {
		message.channel.send('Player 1 moved 1 squared down!');
		udpPort.send({
			address: '/cue/1_2/start',
		}, '127.0.0.1', 53000);
	}
	else if (command === 'player1move') {
		// let cmdmsg = message.channel.send ('Player 1 Move Commands')
		message.react('⬆️').then(() => message.react('⬇️').then(() => message.react('⬅️')).then(() => message.react('➡️')));

		const acceptedEmojis = ['⬆️', '⬇️', '⬅️', '➡️'];

		const filter = (reaction, user) => {
	        return acceptedEmojis.includes(reaction.emoji.name) && user.id === message.author.id;
		};

		const collector = message.createReactionCollector(filter, { time: 600000, idle: 120000 });

		collector.on('collect', async (reaction, user) => {
			if (reaction.emoji.name === '⬆️') {
				udpPort.send({
					address: '/cue/1_1/start',
				}, '127.0.0.1', 53000);
				reaction.users.remove(user.id);
			}
			else if (reaction.emoji.name === '⬇️') {
				udpPort.send({
					address: '/cue/1_2/start',
				}, '127.0.0.1', 53000);
				reaction.users.remove(user.id);
			}
			else if (reaction.emoji.name === '⬅️') {
				udpPort.send({
					address: '/cue/1_3/start',
				}, '127.0.0.1', 53000);
				reaction.users.remove(user.id);
			}
			else if (reaction.emoji.name === '➡️') {
				udpPort.send({
					address: '/cue/1_4/start',
				}, '127.0.0.1', 53000);
				reaction.users.remove(user.id);
			}
		  });

	}
	else if (command === 'player2move') {
		// let cmdmsg = message.channel.send ('Player 1 Move Commands')
		message.react('⬆️').then(() => message.react('⬇️').then(() => message.react('⬅️')).then(() => message.react('➡️')));

		const acceptedEmojis = ['⬆️', '⬇️', '⬅️', '➡️'];

		const filter = (reaction, user) => {
	        return acceptedEmojis.includes(reaction.emoji.name) && user.id === message.author.id;
		};

		const collector = message.createReactionCollector(filter, { time: 600000, idle: 120000 });

		collector.on('collect', async (reaction, user) => {
			if (reaction.emoji.name === '⬆️') {
				udpPort.send({
					address: '/cue/2_1/start',
				}, '127.0.0.1', 53000);
				reaction.users.remove(user.id);
			}
			else if (reaction.emoji.name === '⬇️') {
				udpPort.send({
					address: '/cue/2_2/start',
				}, '127.0.0.1', 53000);
				reaction.users.remove(user.id);
			}
			else if (reaction.emoji.name === '⬅️') {
				udpPort.send({
					address: '/cue/2_3/start',
				}, '127.0.0.1', 53000);
				reaction.users.remove(user.id);
			}
			else if (reaction.emoji.name === '➡️') {
				udpPort.send({
					address: '/cue/2_4/start',
				}, '127.0.0.1', 53000);
				reaction.users.remove(user.id);
			}
		  });

	}

});

client.login(token);