module.exports = async(client, guild) => {
    // Emitted whenever the client joins a guild:
    console.log(`Joined guild ${guild.name}, hosting a ${guild.large ? "major" : "minor"} total of ${guild.members.size} members!`);

    // Automatically create muted role and logs channel on join:
    console.log(`Starting to setup moderation config for guild: ${guild.name}.`);
    const role = guild.roles.find((r) => r.name.toLowerCase() == "muted");
    
    if (!role) {
		let muteRole = await guild.createRole({
			name: 'Muted',
			color: '#3f3f3f',
			permissions: []
        });
        
		for (const channel of guild.channels) {
			channel.overwritePermissions(muteRole, {
				SEND_MESSAGES: false
			});
        }
        
        console.log(`Successfully created Muted role in ${guild.name}.`);
    }

    let channel = guild.channels.find((c) => c.name.toLowerCase() == "logs");
    if (!channel) channel = this.logChannels.get(guild.id);
    
    if (!channel) {
        let newChannel = await guild.createChannel("logs", {
            type: "text",
            permissionOverwrites: [{
                id: guild.id,
                deny: ["VIEW_CHANNEL"]
            }]
        });

        this.logChannels.set(guild.id, newChannel);
        console.log(`Successfully setup a logs channel in ${guild.name}.`);
    }
}