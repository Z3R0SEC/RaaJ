const axios = require('axios');
const fs = require('fs');
const path = require('path');
const logger = require('../../includes/logger');

module.exports.config = {
    name: "raaj",
    admin: false,
    description: "Chat with Raaj Ai",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    const userID = event.senderID;
    const body = args.join(" ");

    if (!body) {
        return api.sendMessage("Yes ?", event.threadID);
    }

    try {
        const response = await axios.get('http://raaj-api.x10.bz/smart', {
            params: {
                user: userID,
                prompt: body
            }
        });

        const data = response.data;
        if (data.error) {
            return api.sendMessage(`${data.error}`, event.threadID);
        }
        if (data.reply) {
            api.sendMessage(data.reply, event.threadID);
        }
        if (data.image) {
            const imagePath = path.join(__dirname, 'cache/kuma.jpg');
            const writer = fs.createWriteStream(imagePath);
            const imageResponse = await axios.get(data.image, { responseType: 'stream' });

            imageResponse.data.pipe(writer);
            writer.on('finish', () => {
                api.sendMessage({
                    body: "",
                    attachment: fs.createReadStream(imagePath)
                }, event.threadID, () => {
                    fs.unlinkSync(imagePath);
                });
            });

            writer.on('error', (err) => {
                logger(`Error downloading image: ${err.message}`, 'error');
                api.sendMessage("Error sending requested photo", event.threadID);
            });
        }

        if (data.song) {
            const songPath = path.join(__dirname, 'cache/song.mp3');
            const songResponse = await axios.get(data.song, { responseType: 'stream' });

            const songWriter = fs.createWriteStream(songPath);
            songResponse.data.pipe(songWriter);

            songWriter.on('finish', () => {
                const msg = "Here is your song dawg!";
                api.sendMessage({
                    body: msg,
                    attachment: fs.createReadStream(songPath)
                }, event.threadID, () => {
                    fs.unlinkSync(songPath);
                });
            });

            songWriter.on('error', (err) => {
                logger(`Error downloading song: ${err.message}`, 'error');
                api.sendMessage("Error downloading the song.", event.threadID);
            });
        }

    } catch (error) {
        logger(`AI command error: ${error.message}`, 'error');
        api.sendMessage("An error occurred while processing your request. Please try again later. "+ error.message, event.threadID);
    }
};
