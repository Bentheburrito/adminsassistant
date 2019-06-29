exports.aliases = ["setlogs", "configurelogchannel"]
exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You cannot use this command.");
    if (!args.length > 0) return message.channel.send("Please provide (the id of) the channel you wish to configure.");

    let id = args[0];
    let reqChannel = client.channels.get(id);
    if (!reqChannel) return message.channel.send("Could not find channel.");
    if (reqChannel.type !== "text") return message.channel.send("Channel must be a text channel.");

    let curChannel = await client.logChannels.get(message.guild.id);
    if (!curChannel) curChannel = "None";

    try {
        await this.logChannels.set(message.guild.id, reqChannel);
        message.channel.send(`✅ Successfully changed log channel from ${curChannel} --> ${reqChannel}.`);
    } catch(err) {
        message.channel.send("❌ There was an error whilst changing log channels.");
        console.error(err);
    }
}