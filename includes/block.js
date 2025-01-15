/**

Copyright (c) 2025 Z3R0SEC. All rights reserved.

- This software is provided "as is" without warranty of any kind.
- Use of this software is at your own risk.
- Editing the code without proper understanding may cause unintended consequences.
- Redistribution of this software is strictly prohibited and/or requires retaining the original credits.
- By using this software, you acknowledge that you have read and understood these terms.

**/

const { readConfig, writeConfig } = require('./handleConfig');
const logger = require('./logger');

module.exports = async function ({ api, event }) {

    let config = readConfig();
    if (config.blocked && config.blocked.includes(event.senderID)) {
        return "";
    }
    const message = event.body.toLowerCase();
    const badWords = config.badWords || [];

    const containsBadWords = badWords.some(word => message.includes(word));

    if (containsBadWords) {
        if (!config.blocked) {
            config.blocked = [];
        }
        if (!config.blocked.includes(event.senderID)) {
            config.blocked.push(event.senderID);
            writeConfig(config);
            logger(`🤵 ${event.senderID} Has Been Blocked!.`, "info");

            api.sendMessage("You've been cast into the shadows for swearing.. Your presence is no longer tolerated. All messages from you will be ignored but you'll still see our posts and updates. If you believe this is an error, beg for mercy by contacting the admin with a screenshot of your last message and bot message before being banished.\nPlease make sure that both your message and bot blocking message appears on your screenshot.", event.threadID);
        }
        return;
    }
};

// This Code Was Written By Me Z3R0SEC. Special Thanks to
// Cyber Paladins for Contributing in the success of this
// Project. Do not Change Credits for any Reason Unless
// Authorized By Me!
