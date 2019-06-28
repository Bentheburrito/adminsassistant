exports.aliases = ["slow", "setratelimit"];
exports.run = (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You cannot use this command.");

    let curRateLimit = message.channel.rateLimitPerUser;
    // Ideally, would somehow check if it's a proper integer value.
    if (curRateLimit == 0) {
        let newRateLimit = args[0];
        if (!newRateLimit) return message.channel.send("Please provide a new chat cooldown in seconds.");

        try {
            message.channel.setRateLimitPerUser(newRateLimit);
            message.channel.send(`✅ Set new chat cooldown to ${newRateLimit} seconds.`);
        } catch(err) {
            message.channel.send("❌ Error whilst setting chat cooldown, ensure you're providing a time in seconds.");
            console.error(err);
        }
    } else {
        try {
            message.channel.setRateLimitPerUser(0);
            message.channel.send("✅ Reset chat cooldown.");
        } catch(err) {
            message.channel.send("❌ Error whilst resetting chat cooldown.");
            console.error(err);
        }
    }
}