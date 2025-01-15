module.exports.config = {
    name: "setall",
    admin: false,
    description: "set all members nickname",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event }) => {
    const { senderID, body, threadID } = event;
    const nickname = body.replace(/^(setnameall)/i, '').trim();

    if (!nickname) {
        return api.sendMessage("Usage: setall <nickname>", threadID);
    }

    try {
        const threadInfo = await api.getThreadInfo(threadID);
        const participants = threadInfo.participantIDs;
        for (let userID of participants) {
            if (userID !== senderID) {
                await api.changeNickname(nickname, threadID, userID);
            }
        }

        return api.sendMessage(`SuccessFully set all members nickname (except you).`, threadID);
    } catch (error) {
        return api.sendMessage("An error occurred while setting nickname for members. Add me as an admin and try again", threadID);
    }
};
