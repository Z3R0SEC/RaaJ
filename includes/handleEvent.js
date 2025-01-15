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

module.exports = async function ({ api, event }) {
    const eventsDir = path.join(__dirname, '../kumar/events');  // Define events directory
    const eventFiles = fs.readdirSync(eventsDir).filter(file => file.endsWith('.js'));  // Read all event files

    for (const file of eventFiles) {
        const eventHandler = require(path.join(eventsDir, file));
        if (!eventHandler.config || !eventHandler.config.name) {
            logger(`Event handler ${file} skipped no config name found!`, "warn");
            continue;
        }

        if (eventHandler.config.eventType === event.logMessageType) {
            try {
                await eventHandler.run({ api, event });
                logger(`Hamdled Event ${event.type}`, "event");
            } catch (error) {
                logger(`Unhandled Event ${eventHandler.config.name}`, "error");
            }
            return;
        }
    }

    "";
};

// This Code Was Written By Me Z3R0SEC. Special Thanks to
// Cyber Paladins for Contributing in the success of this
// Project. Do not Change Credits for any Reason Unless
// Authorized By Me!
