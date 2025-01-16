const fs = require("fs");
const axios = require("axios");

module.exports.config = {
    name: "setpp",
    admin: false,
    description: "Sets the bot's profile picture",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event }) => {
    // Check if a message was replied to and if it contains attachments
    if (event.messageReply && event.messageReply.attachments.length > 0) {
        const attachment = event.messageReply.attachments[0];
        
        // Make sure the attachment is an image
        if (attachment.type === "photo") {
            const imageUrl = attachment.url;
            
            try {
                // Download the image
                const response = await axios({
                    url: imageUrl,
                    responseType: "stream"
                });
                
                const filePath = __dirname + "cache/pp.jpg";
                
                // Save the image to a local file
                const writer = fs.createWriteStream(filePath);
                response.data.pipe(writer);

                writer.on("finish", () => {
                    // Once the image is downloaded, set it as the profile picture
                    api.changeProfilePicture(fs.createReadStream(filePath), (err) => {
                        if (err) {
                            api.sendMessage("Failed to change profile picture.", event.threadID);
                        } else {
                            api.sendMessage("Profile picture updated successfully!", event.threadID);
                        }

                        // Delete the local file after use
                        fs.unlinkSync(filePath);
                    });
                });

                writer.on("error", () => {
                    api.sendMessage("Error saving the image file. "+ error, event.threadID);
                });

            } catch (error) {
                api.sendMessage("Failed to download the image: "+ error, event.threadID);
            }

        } else {
            api.sendMessage("Please reply to a photo to set as the profile picture.", event.threadID);
        }

    } else {
        api.sendMessage("You need to reply to a message with an image to set it as the profile picture.", event.threadID);
    }
};
