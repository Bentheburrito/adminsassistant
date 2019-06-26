exports.time = 60000;
exports.run = async (client) => {

	const [rows, fields] = await client.con.execute(`SELECT * FROM mutedUsers;`);

	let expiredMutes = [];
	for (var row of rows) {
		if (Date.now() > row.expiration) {
			expiredMutes.push(row);

			let guild = client.guilds.get(row.guild_id);
			if (!guild) return console.log(`Couldn't unmute user with ID '${row.id}' because bot is not in the guild anymore.`);
			let member = guild.members.find(m => m.id === row.id);
			if (!member) return console.log(`Couldn't unmute member with id '${row.id}' in guild ${guild.name}`);
			let muteRole = guild.roles.find(r => r.name === "Muted");
			if (!muteRole) return console.log(`Couldn't get muteRole from guild '${guild.name}`);

			await member.removeRole(muteRole).catch(console.log);
			console.log(`Unmuted user ${member.user.username} (expired mute)`);
		}
	}
	if (expiredMutes.length > 0) {
		await client.con.execute(`DELETE FROM mutedUsers WHERE (id, guild_id) IN (${expiredMutes.map(row => `("${row.id}", "${row.guild_id}")`).join(',')});`);
		console.log('Removed mute record.');
	}
}