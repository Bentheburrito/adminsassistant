module.exports = (client) => {
    console.log(`Successfully logged in as ${client.user.tag}, serving ${client.guilds.size} guilds!`);
    client.user.setActivity("Now Online", { type: "PLAYING"} );

    // In the future we may need to call some funcs/other things here, otherwise it will pb be mainly empty:
    // ~~~
}