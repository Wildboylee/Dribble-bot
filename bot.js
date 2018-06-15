const Discord = require('discord.js');
const request = require("request");
const { Client, Util } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

const client = new Client({ disableEveryone: true });

const youtube = new YouTube(process.env.GOOGLE_API_KEY);

const queue = new Map();

		const pickRandom = require('pick-random');

client.on('ready', () => {
  console.log('I am ready!');
});
client.on('message', message => {
				var msg = message.toString();
				outerloop:
				for (var i = 0; i < msg.length; i++) {
								if (msg[i] + msg[i+1] + msg[i+2] + msg[i+3] + msg[i+4] + msg[i+5] + msg[i+6] + msg[i+7] + msg[i+8] + msg[i+9] === "discord.gg")  {
												console.log(msg + " Deleted!");
												message.reply("don\'t advertise!");
												message.delete();
												break;
								}
								if (msg[i] + msg[i+1] + msg[i+2] + msg[i+3] + msg[i+4] + msg[i+5] + msg[i+6] + msg[i+7] + msg[i+8] + msg[i+9] + msg[i+10] + msg[i+11] + msg[i+12] + msg[i+13] + msg[i+14] + msg[i+15] + msg[i+16] + msg[i+17] + msg[i+18] + msg[i+19] + msg[i+20] === "discordapp.com/invite")  { //21
												console.log(msg + " Deleted!");
												message.reply("don\'t advertise!");
												message.delete();
												break;
								}
								if (msg[i] + msg[i+1] + msg[i+2] === "gg/")  {
												console.log(msg + " Deleted!");
												message.reply("don\'t advertise!");
												message.delete();
												break;
								}
								if (msg[i] + msg[i+1] + msg[i+2] + msg[i+3] + msg[i+4] + msg[i+5] + msg[i+6] === "/invite")  {
												console.log(msg + " Deleted!");
												message.reply("don\'t advertise!");
												message.delete();
												break;
								}
								
								
								
								
}
});




client.on('messageUpdate', (omsg, nmsg) => {
  var msg = nmsg.toString();
				for (var i = 0; i < msg.length; i++) {
								if (msg[i] + msg[i+1] + msg[i+2] + msg[i+3] + msg[i+4] + msg[i+5] + msg[i+6] + msg[i+7] + msg[i+8] + msg[i+9] === "discord.gg")  {
												console.log(msg + " Deleted!");
												nmsg.reply("don\'t advertise!");
												nmsg.delete();
												break;
								}
								if (msg[i] + msg[i+1] + msg[i+2] + msg[i+3] + msg[i+4] + msg[i+5] + msg[i+6] + msg[i+7] + msg[i+8] + msg[i+9] + msg[i+10] + msg[i+11] + msg[i+12] + msg[i+13] + msg[i+14] + msg[i+15] + msg[i+16] + msg[i+17] + msg[i+18] + msg[i+19] + msg[i+20] === "discordapp.com/invite")  { //21
												console.log(msg + " Deleted!");
												nmsg.reply("don\'t advertise!");
												nmsg.delete();
												break;
								}
								if (msg[i] + msg[i+1] + msg[i+2] === "gg/")  {
												console.log(msg + " Deleted!");
												nmsg.reply("don\'t advertise!");
												nmsg.delete();
												break;
								}
								if (msg[i] + msg[i+1] + msg[i+2] + msg[i+3] + msg[i+4] + msg[i+5] + msg[i+6] === "/invite")  {
												console.log(msg + " Deleted!");
												nmsg.reply("don\'t advertise!");
												nmsg.delete();
												break;
								}
}
});













client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log('Yo this ready!'));

client.on('disconnect', () => console.log('I just disconnected, making sure you know, I will reconnect now...'));

client.on('reconnecting', () => console.log('I am reconnecting now!'));

client.on('message', async msg => { // eslint-disable-line
	if (msg.author.bot) return undefined;
	if (!msg.content.startsWith(PREFIX)) return undefined;

	const args = msg.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(msg.guild.id);

	let command = msg.content.toLowerCase().split(' ')[0];
	command = command.slice(PREFIX.length)
	
	
	
	
	
	
	
	
	
	if(command === "info") {
    msg.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "<a:thinkloading:454774003618545698> Information <a:thinkloading:454774003618545698>", //https://steamcommunity.com/sharedfiles/filedetails/?id=1387294537
    description: "This bot was created by Dribble(Dribblinq)#9842\nIt was made mostly as a project to test different settings and commands. But is used mainly in the GTA V Rainmakers discord"
  }
});
  }
	if(command === "test") {
		var yesterday = Math.round((new Date()).getTime() / 1000) - 86400;
		msg.channel.send("Current time: " + Math.round((new Date()).getTime() / 1000));
    msg.channel.send("You joined " + ((msg.member.joinedTimestamp / 1000) - Math.round((new Date()).getTime() / 1000)) + " seconds ago");
		if (yesterday >= msg.member.joinedTimestamp) {
			msg.channel.send("You joined less than 24 hours ago");
		} else {
			msg.channel.send("You joined more than 24 hours ago");
		}
	}
	
	

	if (command === 'play') {
		const voiceChannel = msg.member.voiceChannel;
		if (!voiceChannel) return msg.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has('CONNECT')) {
			return msg.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
		}
		if (!permissions.has('SPEAK')) {
			return msg.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
		}

		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
				const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
				await handleVideo(video2, msg, voiceChannel, true); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
		} else {
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					var videos = await youtube.searchVideos(searchString, 10);
					let index = 0;
					msg.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Please provide a value to select one of the search results ranging from 1-10.
					`);
					// eslint-disable-next-line max-depth
					try {
						var response = await msg.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
							maxMatches: 1,
							time: 10000,
							errors: ['time']
						});
					} catch (err) {
						console.error(err);
						return msg.channel.send('No or invalid value entered, cancelling video selection.');
					}
					const videoIndex = parseInt(response.first().content);
					var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
				} catch (err) {
					console.error(err);
					return msg.channel.send('🆘 I could not obtain any search results.');
				}
			}
			return handleVideo(video, msg, voiceChannel);
		}
	} else if (command === 'skip') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could skip for you.');
		serverQueue.connection.dispatcher.end('Skip command has been used!');
		return undefined;
	} else if (command === 'stop') {
		if (!msg.member.voiceChannel) return msg.channel.send('You are not in a voice channel!');
		if (!serverQueue) return msg.channel.send('There is nothing playing that I could stop for you.');
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end('Stop command has been used!');
		return undefined;
	} else if (command === 'np') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`🎶 Now playing: **${serverQueue.songs[0].title}**`);
	} else if (command === 'queue') {
		if (!serverQueue) return msg.channel.send('There is nothing playing.');
		return msg.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
**Now playing:** ${serverQueue.songs[0].title}
		`);
	} else if (command === 'pause') {
		if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
			serverQueue.connection.dispatcher.pause();
			return msg.channel.send('⏸ Paused the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === 'resume') {
		if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
			return msg.channel.send('▶ Resumed the music for you!');
		}
		return msg.channel.send('There is nothing playing.');
	} else if (command === 'help') {
		return msg.channel.send('```\ntest1\ntest2\ntest3```');
		
		
	} else if (command === 'dirtymale') {
		var randommsg = pickRandom(['I am going to tie you up to a bed and ride you harder than you have ever been ridden.', 'I will suck your dick so hard you will cum within seconds and jizz all over my face.', 'I want you to bend down and touch your toes so I can insert my large black strapon into your ass and make you feel how I feel.'], {count: 1});
		return msg.channel.send(randommsg);
	} else if (command === 'pun') {
		var randonmsg = pickRandom(['🐿Are you a squirrel, cause you should suck my nuts.🌰' , ' '], {count: 1});
		return msg.channel.send(randommsg);
	}
	

	return undefined;
});

async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Util.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
		else return msg.channel.send(`✅ **${song.title}** has been added to the queue!`);
	}
	return undefined;
}

function play(guild, song) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 25);

	serverQueue.textChannel.send(`🎶 Start playing: **${song.title}**`);
}


client.login(process.env.BOT_TOKEN);
