module.exports.config = {
    name: "adminChange",
    eventType: "log:admin",
    description: "Admin added or removed"
};

module.exports.run = async ({ api, event }) => {
    try {
        const authorID = event.author;
        const adminInfo = await api.getUserInfo(authorID);
        const authorName = adminInfo[authorID].name;

        const adminChangeType = event.logMessageData.ADMIN_EVENT === 'add_admin' ? 'added as an admin' : 'removed from admins';
        const userID = event.logMessageData.TARGET_ID;
        const userInfo = await api.getUserInfo(userID);
        const userName = userInfo[userID].name;

        const message = `${userName} was ${adminChangeType} by ${authorName}`;
        return api.sendMessage(message, event.threadID);
    } catch (error) {
        return logger("Error: " + error, "event");
    }
};
