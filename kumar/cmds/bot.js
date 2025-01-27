const { readConfig, writeConfig } = require("../../includes/handleConfig");

module.exports.config = {
    name: "bot",
    admin: true,
    description: "Manage Bot Operation",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    const config = readConfig();
    const command = args[0] ? args[0].toLowerCase() : null;
    const userID = event.senderID;

    switch (command) {
        case 'restart':
            api.sendMessage("Bot Restarting...", event.threadID, () => {
                process.exit(1);
            });
            break;

        case 'offbot':
        case 'shutdown':
            api.sendMessage("Shutting down the bot...", event.threadID, () => {
                process.exit(0);
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

        case 'addadmin':
            if (!args[1]) return api.sendMessage("Please provide the User ID to add as admin.", event.threadID);
            const newAdminID = args[1];
            if (!config.adminIds.includes(newAdminID)) {
                config.adminIds.push(newAdminID);
                writeConfig(config);
                api.sendMessage(`Added ${newAdminID} as an admin.`, event.threadID);
            } else {
                api.sendMessage(`${newAdminID} is already an admin.`, event.threadID);
            }
            break;

        case 'rmadmin':
        case 'removeadmin':
            if (!args[1]) return api.sendMessage("Please provide the User ID to remove as admin.", event.threadID);
            const removeAdminID = args[1];
            if (config.adminIds.includes(removeAdminID)) {
                config.adminIds = config.adminIds.filter(id => id !== removeAdminID);
                writeConfig(config);
                api.sendMessage(`Removed ${removeAdminID} from admins.`, event.threadID);
            } else {
                api.sendMessage(`${removeAdminID} is not an admin.`, event.threadID);
            }
            break;

        case 'listadmins':
            api.getUserInfo(config.adminIds, (err, info) => {
                if (err) return api.sendMessage("Failed to retrieve admin information.", event.threadID);
                let adminList = config.adminIds.map(id => `${info[id].name} (ID: ${id})`).join("\n");
                api.sendMessage(`Current Admins:\n\n${adminList}`, event.threadID);
            });
            break;

        default:
            api.sendMessage("Unknown command. Available commands are:\n\n- restart\n- offbot/shutdown\n- status\n- uptime\n- addadmin <uid>\n- rmadmin/removeadmin <uid>\n- listadmins", event.threadID);
            break;
    }
};
