exports.aliases = ["deafen", "vcdeafen"];
exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINSTRATOR")) return message.channel.send("You cannot use this command.");
    if (!args.length > 0) return message.channel.send("Please provide (the id of) the user you wish to deafen.");

    let id = args[0];
    let member = await message.guild.fetchMember(id).catch(console.error);
    if (!member) return message.channel.send("Did not find user.");

    let deafened = member.serverDeaf;
    if (deafened) return message.channel.send("This member is already server deafened.");

    try {
        await member.setDeaf(true);
        message.channel.send("✅ Successfully deafened user.");
    } catch (err) {
        message.channel.send("❌ There was en error whilst deafening the user.");
        console.error(err);
    }
}   