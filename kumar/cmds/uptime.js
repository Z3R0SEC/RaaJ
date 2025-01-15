module.exports.config = {
    name: "uptime",
    admin: false,
    description: "Shows the bot's uptime",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event }) => {
    const milliseconds = process.uptime() * 1000; // Get uptime in ms
    const uptime = new Date(milliseconds).toISOString().substr(11, 8); // Convert to HH:MM:SS
    api.sendMessage(`Bot Uptime: ${uptime}`, event.threadID);
};
