module.exports.config = {
    name: "kick",
    admin: true,
    description: "Kick user from group",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    const { messageReply } = event;
    const userID = args[0];
    if (!userID || messageReply) {
        return api.sendMessage("Usage: kick <uid> or message reply", event.threadID);
    }

    const uid = args[0] || messageReply.senderID;
    api.removeUserFromGroup(uid, event.threadID, (err) => {
        if (err) return api.sendMessage("Failed to remove user. add me as an admin and try again", event.threadID);
        api.sendMessage(`Kicked ${uid}'s ass out of the group`, event.threadID);
    });
};
