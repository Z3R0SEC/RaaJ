const { readConfig } = require("../../includes/handleConfig");

module.exports.config = {
    name: "notify",
    admin: true,
    description: "Send a notification to all groups",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    const config = readConfig();
    const message = args.join(" ");
    
    if (!message) {
        api.sendMessage("Please provide a message to send to all groups.", event.threadID);
        return;
    }

    if (config.groupIds && config.groupIds.length > 0) {
        for (let groupId of config.groupIds) {
            api.sendMessage(message, groupId, (err) => {
                if (err) api.sendMessage(`Failed to send message to group: ${groupId}`, event.threadID);
            });
        }
        api.sendMessage("Notification sent to all groups.", event.threadID);
    } else {
        api.sendMessage("No groups found in the configuration.", event.threadID);
    }
};
