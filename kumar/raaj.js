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
        return api.sendMessage("Yes?", event.threadID);
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

        // Function to handle file downloading
        const downloadFile = async (url, filePath) => {
            const response = await axios({
                url,
                method: 'GET',
                responseType: 'stream'
            });
            const writer = fs.createWriteStream(filePath);
            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });
        };

        // If there's an image to download and send
        if (data.image) {
            const imagePath = path.join(__dirname, 'cache/kuma.jpg');

            try {
                // Download the image to the cache folder
                await downloadFile(data.image, imagePath);
                logger('Image downloaded successfully', 'info');

                // Send the image and then delete it
                api.sendMessage({
                    body: "",
                    attachment: fs.createReadStream(imagePath)
                }, event.threadID, () => {
                    fs.unlinkSync(imagePath);
                    logger('Image deleted after sending', 'info');
                });

            } catch (err) {
                logger(`Error downloading or sending image: ${err.message}`, 'error');
                api.sendMessage("Error sending requested photo", event.threadID);
            }
        }

        // If there's a song to download and send
        if (data.song) {
            const songPath = path.join(__dirname, 'cache/song.mp3');

            try {
                // Download the song to the cache folder
                await downloadFile(data.song, songPath);
                logger('Song downloaded successfully', 'info');

                // Send the song and then delete it
                api.sendMessage({
                    body: "Here is your song!",
                    attachment: fs.createReadStream(songPath)
                }, event.threadID, () => {
                    fs.unlinkSync(songPath);
                    logger('Song deleted after sending', 'info');
                });

            } catch (err) {
                logger(`Error downloading or sending song: ${err.message}`, 'error');
                api.sendMessage("Error sending the song", event.threadID);
            }
        }

    } catch (error) {
        logger(`AI command error: ${error.message}`, 'error');
        api.sendMessage("An error occurred while processing your request. Please try again later. "+ error.message, event.threadID);
    }
};
