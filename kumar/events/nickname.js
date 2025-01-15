module.exports.config = {
    name: "nicknameChange",
    eventType: "log:user-nickname",
    description: "Nickname change event"
};

module.exports.run = async ({ api, event }) => {
    try {
        const userID = event.logMessageData.participantId;
        const newNickname = event.logMessageData.nickname;
        const userInfo = await api.getUserInfo(userID);
        const userName = userInfo[userID].name;

        const message = `${userName} has changed their nickname to: ${newNickname}`;
        return api.sendMessage(message, event.threadID);
    } catch (error) {
        return logger("Error: " + error, "event");
    }
};
