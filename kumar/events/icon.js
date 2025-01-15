module.exports.config = {
    name: "iconChange",
    eventType: "log:thread-icon",
    description: "Group icon change event"
};

module.exports.run = async ({ api, event }) => {
    try {
        const newIcon = event.logMessageData.threadIcon;
        const message = `The group icon has been changed to: ${newIcon}`;
        return api.sendMessage(message, event.threadID);
    } catch (error) {
        return logger("Error: " + error, "event");
    }
};
