module.exports = (client, guild) => {
    // Emitted whenever the client joins a guild:
    console.log(`Joined guild ${guild.name}, hosting a ${guild.large ? "major" : "minor"} total of ${guild.members.size} members!`);

    // If for whatever reason we want to store guild data, it would originally be kept here:
    // ~~~
}