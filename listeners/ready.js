module.exports = (client) => {
    console.log(`Successfully logged in as ${client.user.tag}, serving ${client.guilds.size} guilds!`);
    client.user.setActivity("This Server Like a Hawk", { type: "WATCHING"} );

    // In the future we may need to call some funcs/other things here, otherwise it will pb be mainly empty:
    // ~~~
}