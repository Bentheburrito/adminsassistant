exports.run = async (client, message, args) => {

	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You can't use that command.`);

	let username = args[0];
	let reason = args.slice(2).join(' ');

	if (!username) return message.channel.send('Please provide the name of a user.');
	if (!reason) reason = 'None.';

	// Should have a case to test ambiguity between multiple guild members
	let member = message.guild.members.find(m => m.user.username.toLowerCase().includes(username.toLowerCase()));
	if (!member) return message.channel.send(`Didn't find anybody with username '${username}'`);

	if (member.hasPermission('ADMINISTRATOR')) return message.channel.send(`I can't ban fellow admins!`);
	if (message.guild.member(client.user).highestRole.comparePositionTo(member.highestRole) < 1) return message.channel.send(`Can't kick a user whose highest role is above the bot's highest role. (You can fix this by moving the "Admin's Assistant" role above other member roles in Server Settings -> Roles).`);

	await member.kick(reason);
	message.channel.send(`Kicked ${member.user.username}. Reason: ${reason}`);
}