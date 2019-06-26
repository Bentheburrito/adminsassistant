exports.aliases = ['m', 'unmute'];
exports.run = async (client, message, args) => {
	let username = args[0];
	let time = args[1];
	let uot = args[2];

	if (!username) return message.channel.send('Please provide the name of a user.');
	if (isNaN(time)) { // If time is not provided/isn't a number, mute them indefinitely (10 years).
		time = 120;
		uot = 'months';
	}

	// Should have a case to test ambiguity between multiple guild members
	let member = message.guild.members.find(m => m.user.username.toLowerCase().includes(username.toLowerCase()));
	if (!member) return message.channel.send(`Didn't find anybody with username '${username}'`);

	if (member.hasPermission('ADMINISTRATOR')) return message.channel.send(`I can't mute fellow admins!`);

	let muteRole = message.guild.roles.find(r => r.name === "Muted");
	if (!muteRole) {
		console.log(`Muted role not found in ${message.guild.name}, creating one now.`);
		muteRole = await message.guild.createRole({
			name: 'Muted',
			color: '#3f3f3f',
			permissions: []
		});
		for (var channel of message.guild.channels) {
			channel.overwritePermissions(muteRole, {
				SEND_MESSAGES: false
			});
		}
	}
	
	let uotMultiplier = 1000; // Defaults to seconds.

	if (uot.startsWith('mo')) {
		uot = 'months';
		uotMultiplier = 2592000000;
	} else if (uot.startsWith('d')) {
		uot = 'days';
		uotMultiplier = 86400000;
	} else if (uot.startsWith('h')) {
		uot = 'hours';
		uotMultiplier = 3600000;
	} else if (uot.startsWith('m')) {
		uot = 'minutes';
		uotMultiplier = 60000;
	} else uot = 'seconds';

	// Store mute info in DB.

	if (member.roles.some(r => r.name === 'Muted')) {
		await member.removeRole(muteRole).catch(console.log);
		message.channel.send(`Unmuted ${member.user.username}`);
	} else {
		await member.addRole(muteRole).catch(console.log)
		message.channel.send(`Muted ${member.user.username} for ${time} ${uot}`);
	}	
}