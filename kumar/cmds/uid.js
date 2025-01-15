module.exports.config = {
    name: "uid",
    prefix: false,
    admin: false,
    description: "Get the user ID of the sender, replied message, or mentioned user.",
    credits: "Created by Kumar"
};

module.exports.run = async ({ api, event, args }) => {
    const { senderID, mentions, messageReply } = event;

    if (messageReply) {
        return api.sendMessage(`${messageReply.senderID}`, event.threadID);
    }
    return api.sendMessage(`${senderID}`, event.threadID);
};
