/**

Copyright (c) 2025 Z3R0SEC. All rights reserved.

- This software is provided "as is" without warranty of any kind.
- Use of this software is at your own risk.
- Editing the code without proper understanding may cause unintended consequences.
- Redistribution of this software is strictly prohibited and/or requires retaining the original credits.
- By using this software, you acknowledge that you have read and understood these terms.

**/
const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const { readConfig } = require('./handleConfig');

module.exports = async function ({ api, event }) {
    const body = event.body.trim();
    const args = body.split(/ +/);
    const commandName = args.shift().toLowerCase();
    const conf = readConfig();

    const commandFiles = fs.readdirSync(path.join(__dirname, '../kumar/cmds')).filter(file => file.endsWith('.js'));
    let loadedCommands = new Map();
    for (let file of commandFiles) {
        const command = require(`../kumar/cmds/${file}`);
        if (command.config && command.config.name) {
            loadedCommands.set(command.config.name.toLowerCase(), command);
        }
    }

    if (loadedCommands.has(commandName)) {
        const command = loadedCommands.get(commandName);
        const botID = await api.getCurrentUserID();
        if (botID === event.senderID) return;
        if (command.config.admin && !conf.adminIds.includes(event.senderID)) {
            return api.sendMessage("𝖸𝗈𝗎 𝖽𝗈𝗇𝗍 𝗁𝖺𝗏𝖾 𝖺𝖼𝖼𝖾𝗌𝗌 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽!", event.threadID);
        }

        try {
            api.sendTypingIndicator(event.threadID);
            await command.run({ api, event, args });
        } catch (error) {
            logger(error.message || error.toString(), "error");
            api.sendMessage("𝖤𝗋𝗋𝗈𝗋 𝗎𝗌𝗂𝗇𝗀 𝗍𝗁𝖺𝗍 𝖼𝗈𝗆𝗆𝖺𝗇𝖽: " +error.message, event.threadID);
        }
    } else {
        "";
    }
};

// This Code Was Written By Me Z3R0SEC. Special Thanks to
// Cyber Paladins for Contributing in the success of this
// Project. Do not Change Credits for any Reason Unless
// Authorized By Me!
