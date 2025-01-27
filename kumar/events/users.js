const { readConfig, writeConfig } = require('../../includes/handleConfig');
const logger = require('../../includes/logger');
const axios = require("axios");
const fs = require('fs');
const path = require('path');

module.exports.config = {
    name: "join",
    eventType: "log:subscribe",
    description: "Added User or Bot In Group"
};

module.exports.run = async ({ api, event }) => {
    try {
        const config = readConfig();
        const botID = await api.getCurrentUserID();
        const threadID = event.threadID;

        // Add group ID to config if the bot is added to a new group
        if (!config.groupIds.includes(threadID)) {
            config.groupIds.push(threadID);
            writeConfig(config);
            logger(`Added new group ID: ${threadID} to config`, "info");
        }

        const userID = event.logMessageData.addedParticipants[0].userFbId;
        const userName = event.logMessageData.addedParticipants[0].firstName || 'New Member';
        const members = event.participantIDs;
        const authinfo = await api.getUserInfo(event.author);
        const author = authinfo[event.author].name;

        let gif = "https://i.pinimg.com/originals/65/eb/8a/65eb8a6b4a8966bafd26d1dee21ed97f.gif";
        let newGif = `https://kaiz-apis.gleeze.com/api/welcomeV2?nickname=${userName}&secondText=You're%20user%20${members.length}&avatar=https://graph.facebook.com/${userID}/picture?access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

        const img = path.join(__dirname, 'image.jpg');
        const writer = fs.createWriteStream(img);
        const res = await axios.get(userID === botID ? gif : newGif, { responseType: 'stream' });
        res.data.pipe(writer);

        writer.on('finish', async () => {
            if (userID === botID) {
                api.sendMessage(`bot has been added to a new group`, "100091064756375");
                const message = `Hello Everyone Im so excited to be added here\n\n𝐓𝐨 𝐒𝐡𝐨𝐰 𝐀𝐥𝐥 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬:\n- 𝐓𝐲𝐩𝐞: 𝐂𝐦𝐝\n\n𝐓𝐨 𝐂𝐡𝐚𝐭 𝐖𝐢𝐭𝐡 𝐌𝐞:\n- 𝐓𝐲𝐩𝐞: 𝐑𝐚𝐚𝐣 <𝐦𝐬𝐠>`;
                api.sendMessage(`${message}`, event.threadID);
                api.sendMessage({
                    body: `${author} Added Me Here`,
                    attachment: fs.createReadStream(img)
                }, event.threadID, () => {
                    fs.unlinkSync(img);
                });
            } else {
                const msg = `Welcome ${userName}!\n\nWe were ${members.length - 1} soldiers, now we're ${members.length}! 🎉`;
                api.sendMessage({
                    body: msg,
                    attachment: fs.createReadStream(img)
                }, event.threadID, () => {
                    fs.unlinkSync(img);
                });
            }
        });

        writer.on('error', (err) => {
            logger(`Error: ${err.message}`, 'event');
        });

    } catch (error) {
        logger("Error: " + error, "event");
    }
};
