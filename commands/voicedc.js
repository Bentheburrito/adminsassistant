exports.aliases = ["vdc", "dcvoice"];
exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You can't use this command.");
    if (!args.length > 0) return message.channel.send("Please provide (the id of) the user you wish to disconnect.");

    let id = args[0];
    let member = await message.guild.fetchMember(id).catch(console.error);
    if (!member) return message.channel.send("Did not find this user.");

    let vc = member.voiceChannel;
    if (!vc) return message.channel.send("This user is not in a voice channel.");
    
    try {
        await member.setVoiceChannel(null);
        message.channel.send("✅ Successfully disconnected the user.");
    } catch(err) {
        message.channel.send("❌ There was an error whilst disconnecting the user.");
        console.error(err);
    }
}