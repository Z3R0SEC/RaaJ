const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "cmd",
    admin: false,
    description: "Show help menu for available commands",
    usage: "cmd <command name>",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    const commandsDir = path.join(__dirname, '../cmds');
    const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));

    const senderId = event.senderID;
    const userInfo = await api.getUserInfo(senderId);
    const userName = userInfo[senderId].firstName || "User";

    if (args.length > 0) {
        const commandName = args[0].toLowerCase();

        const commandFile = commandFiles.find(file => {
            const command = require(path.join(commandsDir, file));
            return command.config.name.toLowerCase() === commandName;
        });

        if (commandFile) {
            const command = require(path.join(commandsDir, commandFile));
            const commandDetails = `
━━━━━━━━━━━━━━
[»] 𝙽𝚊𝚖𝚎: ‹ ${command.config.name} ›
[»] 𝙳𝚎𝚜𝚌: ‹ ${command.config.description} ›
[»] 𝚄𝚜𝚊𝚐𝚎: ‹ ${command.config.usage || "Not available"} ›
━━━━━━━━━━━━━━`;

            return api.sendMessage(commandDetails, event.threadID);
        } else {
            return api.sendMessage(`Command ‹ ${commandName} › is not available.`, event.threadID);
        }
    }

    const commandsMap = new Map();
    commandFiles.forEach(file => {
        const command = require(path.join(commandsDir, file));
        commandsMap.set(command.config.name.toLowerCase(), command);
    });

    const commandsList = Array.from(commandsMap.values()).map(command => {
        return `│ › ${command.config.name}`;
    }).join('\n');

    const helpMessage = `
╭━━━━━━━━━━━━━━
│    « ${userName.split(" ")[0]} »
│╭─╼━━━━━━━━╾─╮
│${commandsList}
│╰─━━━━━━━━━╾─╯
│     ‹◉⁠‿⁠◉›
╰━━━━━━━━━━━━━━`;

    api.sendMessage(helpMessage, event.threadID);
};
