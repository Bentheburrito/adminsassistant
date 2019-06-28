exports.aliases = ["serverunmute", "vcunmute"];
exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You cannot use this command.");
    if (!args.length > 0) return message.channel.send("Please provide (the id of) the user you wish to voice mute.");

    let id = args[0];
    let member = await message.guild.fetchMember(id).catch(console.error);
    if (!member) return message.channel.send("Did not find user.");

    let muted = member.serverMute;
    if (!muted) return message.channel.send("This user is not server muted.");

    try {
        await member.setMute(false);
        message.channel.send("✅ Successfully server unmuted user.");
    } catch (err) {
        message.channel.send("❌ There was an error whilst server unmuting the user.");
    }
}

