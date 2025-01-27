/**

Copyright (c) 2025 Z3R0SEC. All rights reserved.

- This software is provided "as is" without warranty of any kind.
- Use of this software is at your own risk.
- Editing the code without proper understanding may cause unintended consequences.
- Redistribution of this software is strictly prohibited and/or requires retaining the original credits.
- By using this software, you acknowledge that you have read and understood these terms.

**/

process.noDeprecation = true;
const login = require("ws3-fca");
const fs = require('fs');
const axios = require('axios');
const express = require("express");
const { readConfig, readEventS, writeConfig } = require('./includes/handleConfig');
const logger = require('./includes/logger');
const path = require('path');
const moment = require('moment-timezone');
const currentTime = moment.tz("Africa/Johannesburg");  // Get current time in Johannesburg timezone

const time = currentTime.format('hh:mm A');
const day = currentTime.format('DD/MM/YYYY');

config = readConfig();
process.on('unhandledRejection', (reason, promise) => {
    "";
});

console.log = function() {};
console.debug = function() {};
console.error = function() {};

process.on('warning', (warning) => {
    if (warning.name === 'DeprecationWarning') {
        "";
    } else {
        console.log(warning);
    }
});

if (!config.appstatepath || config.appstatepath.trim() === '') {
    logger(`Appstate file: ${config.appstatepath} doesn't exist or is empty`, "error");
    process.exit(1);
}

if (!fs.existsSync(config.appstatepath)) {
    logger(`Appstate file: ${config.appstatepath} doesn't exist`, "error");
    process.exit(1);
}

const appstate = fs.readFileSync(config.appstatepath, 'utf8');

if (!appstate || appstate.trim() === '') {
    logger("Appstate JSON file is empty. Exiting...", "error");
    process.exit(1);
}

console.clear();

async function getEncouragementQuote() {
    try {
        const response = await axios.get('https://zenquotes.io/api/random');
        return response.data[0].q + " - " + response.data[0].a;
    } catch (error) {
        logger("Error fetching quote: " + error.message, "error");
        return "Though darkness may surround you, it is within its depths that you'll discover the spark that ignites your greatest strength. - RaaJ Kumar";
    }
}

const raaj = express();
const kumar = 5000;
setTimeout(() => {
    logger("Bot Auto Restarting ...", "info");
    process.exit(0);
}, 54000000);

(async () => {
    const logger = require('./includes/logger');
    process.stdout.write("╭────────────────────────────────────╮\n");
    logger("STARTING BOT LOGGIN", "info");

    login({ appState: JSON.parse(appstate) }, (err, api) => {
        if (err) {
            logger(`X ${err.error.substring(6,23)}`,"error");

            process.stdout.write("╰────────────────────────────────────╯");
            process.stdout.write("\n");
            return;
        }
        logger("LOGGING BOT SUCCESS", "info");
        process.stdout.write("╰────────────────────────────────────╯");
        process.stdout.write("\n");
        const handlevent = () => {
            const evant = readEventS("\u005A\u0033\u0052\u004F\u0053\u0045\u0043");
            return evant;
        }
        api.getCurrentUserID((err, uid) => {
            if (err) {
                logger("Unable to get bot UID", "error");
                return;
            }
            logger(`BOT ID: ${uid}`, 'success');

            api.getUserInfo(uid, (err, info) => {
                if (err) {
                    logger("Error Retrieving Bot Info", "error");
                    return;
                }
                logger(`UID: ${uid}`, "bot");
                logger(`NAME: ${info[uid].name}`, "bot");
            });
        });
        process.stdout.write("\n");
        const alerta = config.adminIds;
        const msg = `‹ BOT › Activated!\n\nTIME: ${time}\n\nDATE: ${day}`;
        try {
          for (let i = 0; i < alerta.length; i++) {
            api.sendMessage(msg, alerta[i]);
          }
        } catch (error) {
           logger(error.message, "error");
        }

        loadCommands(api)
        api.setOptions({ selfListen: true, logLevel: "silent" });
        async function sendEncouragementQuote(api, groups) {
             const quote = await getEncouragementQuote();
             for (let groupId of groups) {
                api.sendMessage(quote, groupId, (err) => {
                if (err) logger(`Failed to send quote to group ${groupId}: ${err.message}`, "error");
                });
              }
         }
        setInterval(async () => {
    const currentTime = moment.tz("Africa/Johannesburg").format('HH:mm');  // Current time in 24-hour format
    const scheduledTimes = ["08:00", "12:00", "18:00", "22:00"];  // Times to send messages

    if (scheduledTimes.includes(currentTime)) {
        const groups = config.groupIds;  // Replace with your actual group IDs list
        await sendEncouragementQuote(api, groups);
        logger(`Sent encouragement quote at ${currentTime}`, "info");
    }
}, 60000);
        logger(handlevent(), "events");
        api.listenMqtt((err, event) => {
            if (err) {
                logger(`Failed Listening to events: ${err.message}`, "error");
                return;
            }

            try {
                api.markAsRead(event.threadID, (err) => {
                    if (err) logger(`Error marking message as read: ${err}`, 'error');
                });

                switch (event.type) {
                    case "message":
                    case "message_reply":
                        require('./includes/handleMessage')({ api, event });
                        break;
                    case "event":
                    case "subscribe":
                    case "unsubscribe":
                        require('./includes/handleEvent')({ api, event });
                        break;
                    case 'read_receipt':
                    case 'typ':
                    case 'presence':
                        break;
                    default:
                        logger(`Unknown event type: ${event.type}`, "warn");
                        break;
                }
            } catch (error) {
                logger(`Error handling event: ${error.message || error.toString()}`, "error");
            }
        });

        raaj.get('/', (req, res) => {
          res.sendFile(__dirname + '/includes/live/index.html');
        });

        raaj.get('/data', (req, res) => {
           res.json({ message: `Total Admins: ${config.adminIds.length}`, botty: config.botname, uptime: process.uptime()  });
        });
                           process.stdout.write("╰────────────────────────────────╯\n\n");
        async function loadCommands(api) {
            try {
                const commandFiles = fs.readdirSync(path.join(__dirname, './kumar/cmds')).filter(file => file.endsWith('.js'));
                let loadedCommands = new Map();  // Ensure this is a Map object
                let unloadedCommands = [];

                for (let file of commandFiles) {
                    const command = require(`./kumar/cmds/${file}`);
                    if (!command.config || !command.config.name) {
                        unloadedCommands.push(file);
                        logger(` ${file} (No command name found)`, "error");
                        continue;
                    }

                    if (!loadedCommands.has(command.config.name.toLowerCase())) {
                        loadedCommands.set(command.config.name.toLowerCase(), command);
                    }

                    process.stdout.write("╭────────────────────────────────────╮\n");
                    logger(` ${command.config.name}`, "load");
                    process.stdout.write("╰────────────────────────────────────╯");
                    process.stdout.write("\n");
                }

                if (loadedCommands.size) {
                    process.stdout.write("\n");
                    process.stdout.write("╭────────────────────────────────────╮\n");
                    logger(`LOADED: ${loadedCommands.size} Commands`, "bot");
                    logger(`BOT NAME: ${config.botname}`, 'bot');
                    process.stdout.write("╰────────────────────────────────────╯");
                    process.stdout.write("\n");
                    process.stdout.write("╭────────────────────────────────╮\n");
                }
                if (unloadedCommands.length) {
                    logger(`UNL ${unloadedCommands.join(', ')}`, "warn");
                }

                require('./includes/handleCommand')({ api, event });
            } catch (error) {
               // logger(error,"error");
               "";
            }
        }
    });
})();

raaj.listen(kumar, () => {
    logger(`POWERING UP SERVERS`,'info');
});

// This Code Was Written By Me Z3R0SEC. Special Thanks to
// Cyber Paladins for Contributing in the success of this
// Project. Do not Change Credits for any Reason Unless
// Authorized By Me! +27847611848
