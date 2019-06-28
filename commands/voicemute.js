exports.aliases = ["servermute", "vcmute"];
exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You cannot use this command.");
    if (!args.length > 0) return message.channel.send("Please provide (the id of) the user you wish to voice mute.");

    let id = args[0];
    let member = await message.guild.fetchMember(id).catch(console.error);
    if (!member) return message.channel.send("Did not find user.");

    let muted = member.serverMute;
    if (muted) return message.channel.send("This user is already server muted.");

    try {
        await member.setMute(true);
        message.channel.send("✅ Successfully server muted user.");
    } catch (err) {
        message.channel.send("❌ There was an error whilst server muting the user.");
    }
}

