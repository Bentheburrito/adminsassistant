module.exports = (client, message) => {
	// "prefixes": ["!", "<@592512269301186565>", "<@!592512269301186565>"],
	const prefixes = client.config.prefixes;
	let prefix = false;

	for (const p of prefixes) if (message.content.startsWith(p)) prefix = p;

	if (!prefix) return;
	let args = message.content.slice(prefix.length).trim().split(/ +/g);
	let commandName = args.shift().toLowerCase();

	let command = client.commands.get(commandName);
	if (!command) return;
	
	command.run(client, message, args);
}
