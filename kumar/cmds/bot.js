module.exports.config = {
    name: "bot",
    admin: true,
    description: "Controls bot operations such as restart, shutdown, etc.",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    const command = args[0] ? args[0].toLowerCase() : null;

    switch (command) {
        case 'restart':
            api.sendMessage("Restarting the bot...", event.threadID, () => {
                process.exit(1); // Restarts the bot
            });
            break;

        case 'offbot':
        case 'shutdown':
            api.sendMessage("Shutting down the bot...", event.threadID, () => {
                process.exit(0); // Exits the process
            });
            break;

        case 'status':
            api.sendMessage("The bot is currently running and responsive. 💻", event.threadID);
            break;

        case 'uptime':
            const uptime = process.uptime();
            const hours = Math.floor(uptime / 3600);
            const minutes = Math.floor((uptime % 3600) / 60);
            const seconds = Math.floor(uptime % 60);
            api.sendMessage(`Uptime: ${hours}h ${minutes}m ${seconds}s`, event.threadID);
            break;

        default:
            api.sendMessage("Unknown command. Available commands are:\n\n- restart\n- offbot/shutdown\n- status\n- uptime", event.threadID);
            break;
    }
};
