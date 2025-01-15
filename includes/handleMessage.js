/**

Copyright (c) 2025 Z3R0SEC. All rights reserved.

- This software is provided "as is" without warranty of any kind.
- Use of this software is at your own risk.
- Editing the code without proper understanding may cause unintended consequences.
- Redistribution of this software is strictly prohibited and/or requires retaining the original credits.
- By using this software, you acknowledge that you have read and understood these terms.

**/

const handleCommand = require('./handleCommand');
const block = require('./block');
const fs = require('fs');
const logger = require('./logger');


const { readConfig } = require("./handleConfig")

module.exports = async function ({ api, event }) {
    try {
       api.markAsDelivered(event.threadID, event.messageID);
       api.markAsReadAll((err, resi) => { if (err) return "None" });

    } catch (error) {
       "";
    }
    let config = readConfig();
    if (config.blocked.includes(event.senderID)) return;
    const botID = await api.getCurrentUserID();
    if (botID === event.senderID) return;

    block({ api, event });
    handleCommand({ api, event });
};

// This Code Was Written By Me Z3R0SEC. Special Thanks to
// Cyber Paladins for Contributing in the success of this
// Project. Do not Change Credits for any Reason Unless
// Authorized By Me!
