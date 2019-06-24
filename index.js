const { Bot } = require("discord.js");

class Client extends Bot {
    constructor() {
        super();

        // Can add more if needed later e.g mysql, request? 
        this.djs = require("discord.js");
        this.fs = require("fs");

        this.commands = new this.djs.Collection();
        this.timers = new this.djs.Collection();
        this.config = require("./config.json");
    }

    attatchCommands() {
        this.fs.readdir("./commands", (e, files) => {
            if (e) return console.log(`Error whilst reading command dir: \n${e}`);
            if (!files) return console.log("Didn't find any files in the ./commands dir.");

            files.forEach((command) => {
                if (!command.endsWith(".js")) return;

                let name = command.split(".js")[0];
                let path = require(`./commands/${command}`);

                this.commands.set(name, path);
                console.log(`Successfully attached command ${name}.`);
            });
        });
    }

	attachListeners() {
		this.fs.readdir("./listeners", (e, files) => {
			if (e) return console.log(`Error reading listeners dir: \n${e}`);
            if (!files) return console.log("Didn't find any listeners.");
			
			files.forEach((listener) => {
				if (!listener.endsWith(".js")) return;
				
                let name = listener.split(".js")[0];
                let path = require(`./listeners/${listener}`);
                
                // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
				console.log(`Registering listener ${name}.`);
                this.on(name, path.bind(null, this));
			}); 
		});
    }
    
    attachTimers() {
        this.fs.readdir("./timers", (e, files) => {
            if (e) return console.log(`Error whilst reading timer dir: \n${e}`);
            if (!files) return console.log("Didn't find any timers.");

            files.forEach((timer) => {
                if (!timer.endsWith(".js")) return;

                let name = timer.split(".js")[0];
                let path = require(`./timers/${timer}`);

                // Timer has an exports.time value in milliseconds for how often the timer is run.
                const runTimer = () => path.run(this);
                setInterval(runTimer, path.time);

                this.timers.set(name, path); 
                console.log(`Registering timer: ${name} to be periodicially ran every ${path.time / 1000} seconds.`);
            });
        });
    }
    
    // Called in ./process.js
    async start() {
        this.attatchCommands();
        this.attatchListeners();
        this.attatchTimers();
        this.login(this.config.token);
    }
}


module.exports = Client;