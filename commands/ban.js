exports.aliases = ['unban'];
exports.run = async (client, message, args) => {

	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You can't use that command.`);

	let username_or_id = args[0];
	let daysToDelete = args[1];
	let reason = args.slice(2).join(' ');

	if (!username_or_id) return message.channel.send('Please provide the name of a user.');
	
	if (!daysToDelete) daysToDelete = 0;
	if (!reason) reason = 'None.';

	// Should have a case to test ambiguity between multiple guild members
	let member = message.guild.members.find(m => m.user.username.toLowerCase().includes(username_or_id.toLowerCase()));
	if (!member) member = message.guild.fetchMember(username_or_id);
	if (!member) {
		let bans = await message.guild.fetchBans();
		let user = bans.find(u => u.username.toLowerCase().includes(username_or_id.toLowerCase()))
		if (!user) return message.channel.send(`Didn't find anybody with username '${username_or_id}'`);

		await message.guild.unban(user, reason).catch(console.log);
		return message.channel.send(`Unbanned ${user.username}.`);
	} else return message.channel.send(`Didn't find anybody with username '${username_or_id}'. If this is untrue, please provide their id instead.`);

	if (member.hasPermission('ADMINISTRATOR')) return message.channel.send(`I can't ban fellow admins!`);
	if (message.guild.member(client.user).highestRole.comparePositionTo(member.highestRole) < 1) return message.channel.send(`Can't ban a user whose highest role is above the bot's highest role. (You can fix this by moving the "Admin's Assistant" role above other member roles in Server Settings -> Roles).`);

	await client.con.execute(`INSERT INTO bannedUsers VALUES ("${member.id}", "${message.guild.id}", NULL);`);
	await member.ban({days: daysToDelete, reason})
	message.channel.send(`Banned ${member.user.username}. Reason: ${reason}`);
}