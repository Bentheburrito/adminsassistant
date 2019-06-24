// The entry point of the bot.
const BotClient = require("./index.js");
const bot = new BotClient();
bot.start();

// Handle rejections:
process.on("unhandledRejection", (reason, promise) => {
    console.log(`Unhandled rejection at: ${promise}, reason: ${reason}.`)
});

process.on('uncaughtException', async(err) => {
    console.error(err, 'Uncaught Exception thrown.'); 

    // pm2 automatically restarts the process so the bot shouldn't go offline.
    process.exit(1); 
});
