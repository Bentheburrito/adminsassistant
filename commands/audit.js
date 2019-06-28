const actionMap = {
    ALL: null,
    GUILD_UPDATE: "Server Update:",
    CHANNEL_CREATE: "Channel Created:",
    CHANNEL_UPDATE: "Channel Updated",
    CHANNEL_DELETE: "Channel Deleted",
    CHANNEL_OVERWRITE_CREATE: "Channel Permission Overwrite Created:",
    CHANNEL_OVERWRITE_UPDATE: "Channel Permission Overwrite Updated:",
    CHANNEL_OVERWRITE_DELETE: "Channel Permission Overwrite Deleted:",
    MEMBER_KICK: "Member Kicked",
    MEMBER_PRUNE: "Members Pruned",
    MEMBER_BAN_ADD: "Member Banned",
    MEMBER_BAN_REMOVE: "Member Unbanned",
    MEMBER_UPDATE: "Member Updated",
    MEMBER_ROLE_UPDATE: "Member Roles Updated",
    ROLE_CREATE: "Role Created",
    ROLE_UPDATE: "Role Update",
    ROLE_DELETE: "Role Deleted",
    INVITE_CREATE: "Invite Created",
    INVITE_UPDATE: "Invite Updated",
    INVITE_DELETE: "Invite Deleted",
    WEBHOOK_CREATE: "Webhook Created",
    WEBHOOK_UPDATE: "Webhook Updated",
    WEBHOOK_DELETE: "Webhook Deleted",
    EMOJI_CREATE: "Emoji Created",
    EMOJI_UPDATE: "Emoji Updated",
    EMOJI_DELETE: "Emoji Deleted",
    MESSAGE_DELETE: "Message Deleted",
}
const keyMap = {
	name: ['changed', ' server name'],
	icon_hash: ['changed', ' server icon'],
	splash_hash: ['changed', ' invite splash artwork'],
	owner_id: ['', ' transfered server ownership'],
	region: ['changed', ' server region'],
	afk_channel_id: ['changed', '\'s afk channel'],
	afk_timeout: ['changed', ' afk timeout'],
	mfa_level: ['changed', ' 2fa requirements'],
	verification_level: ['changed', '\'s required verification level'],
	explicit_content_filter: ['changed', '\'s explicit content filter'],
	default_message_notifications: ['changed', ' server default notification settings'],
	vanity_url_code: ['changed', ' server invite vanity url'],
	$add: ['added a role to', ':'],
	$remove: ['removed a role from', ':'],
	prune_delete_days: ['changed', ' the number of days when inactive and un-roled members are kicked'],
	widget_enabled: ['changed', ' server widget'],
	widget_channel_id: ['changed', ' server widget channel id'],
	position: ['changed', ' the position of a channel'],
	topic: ['changed', ' channel description'],
	bitrate: ['changed', ' voice channel bitrate'],
	permission_overwrites: ['changed', ' channel permissions'],
	nsfw: ['changed', ' nsfw channel restriction'],
	application_id: 'NA',
	permissions: ['changed', ' role permissions'],
	color: ['changed', ' role color'],
	hoist: ['changed', ' role hoist'],
	mentionable: ['changed', '\'s mentionability'],
	allow: ['gave', ' permissions in a channel'],
	deny: ['removed', '\'s permissions in a channel'],
	code: ['changed', ' code'],
	channel_id: ['changed', ' channel id'],
	inviter_id: 'NA',
	max_uses: ['changed', ' the number of times an invite link can be used'],
	uses: 'NA',
	max_age: ['changed', ' how long an invite link lasts'],
	temporary: ['changed', ' an invite links expiration'],
	deaf: ['server deafened', ''],
	mute: ['server muted', ''],
	nick: ['changed', '\'s nickname'],
	avatar_hash: ['changed', '\'s avatar'],
	id: 'NA',
	type: 'NA'
}

exports.run = async (client, message, args) => {

	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You can't use that command.`);

	let username_or_id = args[0];
	let numOfResults = args[1];

	if (!username_or_id) return message.channel.send('Please provide (the id of) the user');
	if (!numOfResults) numOfResults = 10;

	let member = message.guild.members.find(m => m.user.username.toLowerCase().includes(username_or_id.toLowerCase()));
	if (!member) member = await message.guild.fetchMember(username_or_id).catch(console.error);
	if (!member) return message.channel.send(`Didn't find anybody with username '${username_or_id}'`);

	let logs = await message.guild.fetchAuditLogs({
		user: member,
		limit: numOfResults
	});
	// console.log(logs.entries);
	// console.log(logs.entries.first().changes[0])

	let description = '';
	logs.entries.tap(entry => {
		console.log(entry)
		let key = entry.changes[0].key;
		let keyTexts = keyMap[key];
		let oldChange = entry.changes[0].old;
		let newChange = entry.changes[0].new;
		let datePT = entry.createdAt.toLocaleDateString({ timezone: 'America/Tijuana' });
		let timePT = entry.createdAt.toLocaleTimeString({ timezone: 'America/Tijuana' });
		let timestamp = 0;
		let timestampUnit = 'seconds';

		if (key == 'max_age') timestamp = parseInt(newChange);
		if (timestamp > 60) {
			timestamp /= 60;
			timestampUnit = 'minutes';
		}
		if (timestamp > 60) {
			timestamp /= 60;
			timestampUnit = 'hours';
		}
		if (timestamp > 24) {
			timestamp /= 24;
			timestampUnit = 'days';
		}
		
		description += `\n\n**${actionMap[entry.action]}**
		${keyTexts !== 'NA' ? `${entry.executor.username} **${keyTexts[0]} ${['WEBHOOK', 'INVITE', 'MESSAGE'].some(t => t === entry.targetType) ? '' : entry.targetType === 'USER' ? entry.target.username : entry.target.name}${keyTexts[1]}**${oldChange ? ` from ${oldChange}` : ''}${newChange ? key === '$add' || key === '$remove' ? ` ${newChange[0].name}` : ` to ${newChange}` : ''}\n${datePT} at ${timePT} PT` : ''}`;
	});

	let embed = new client.djs.RichEmbed()
		.setTitle(`Audit logs by ${member.displayName}`)
		.setDescription(description);
	message.channel.send('', embed);
}