const actionMap = {
    ALL: null,
    GUILD_UPDATE: "updated the server",
    CHANNEL_CREATE: "created a channel",
    CHANNEL_UPDATE: "updated a channel",
    CHANNEL_DELETE: "deleted a channel",
    CHANNEL_OVERWRITE_CREATE: "created a channel overwrite",
    CHANNEL_OVERWRITE_UPDATE: "updated a channel overwrite",
    CHANNEL_OVERWRITE_DELETE: "deleted a channel overwrite",
    MEMBER_KICK: "kicked a member",
    MEMBER_PRUNE: "pruned members",
    MEMBER_BAN_ADD: "banned a member",
    MEMBER_BAN_REMOVE: "unbanned a member",
    MEMBER_UPDATE: "updated a member",
    MEMBER_ROLE_UPDATE: "updated a member's role(s)",
    ROLE_CREATE: "created a role",
    ROLE_UPDATE: "updated a role",
    ROLE_DELETE: "deleted a role",
    INVITE_CREATE: "created a server invite",
    INVITE_UPDATE: "updated a server invite",
    INVITE_DELETE: "deleted a server invite",
    WEBHOOK_CREATE: "created a webhook",
    WEBHOOK_UPDATE: "updated a webhook",
    WEBHOOK_DELETE: "deleted a webhook",
    EMOJI_CREATE: "created an emoji",
    EMOJI_UPDATE: "updated an emoji",
    EMOJI_DELETE: "deleted an emoji",
    MESSAGE_DELETE: "deleted a message",
}

exports.run = async (client, message, args) => {
	let username = args[0];
	let numOfResults = args[1];

	if (!username) return message.channel.send('Please provide the name of a user.');
	if (!numOfResults) numOfResults = 10;

	let member = message.guild.members.find(m => m.user.username.toLowerCase().includes(username.toLowerCase()));
	if (!member) return message.channel.send(`Didn't find anybody with username '${username}'`);

	let logs = await message.guild.fetchAuditLogs({
		user: member,
		limit: numOfResults
	});
	console.log(logs.entries.get('593514172558606358'));
	let embed = new client.djs.RichEmbed()
		.setTitle(`Audit logs by ${member.displayName}`)
		.setDescription(logs.entries.map(entry => `${entry.executor} **${actionMap[entry.action]}**`).join('\n\n'));
	message.channel.send('', embed);
}