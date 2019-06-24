module.exports = (client, message) => {
	
	// Handle commands:
	if (!message.content.startsWith('!')) return;
	var commandName = message.content.split(' ')[0];
	var args = message.content.split(' ').shift();

	var command = client.commands.get(commandName);
	if (!command) return;
	command.run(client, message, args);
}

