// The entry point of the bot.
const Client = require("./index.js");
const bot = new Client();
bot.start();

// Handle rejections:
process.on("unhandledRejection", (reason, promise) => {
    console.log(`Unhandled rejection at: ${promise}, reason: ${reason}.`)
});

process.on('uncaughtException', async(err) => {
    await console.error(err, 'Uncaught Exception thrown.'); 

    // pm2 automatically restarts the process so the bot shouldn't go offline.
    process.exit(1); 
});
