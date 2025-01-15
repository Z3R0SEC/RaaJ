module.exports.config = {
    name: "setname",
    admin: false,
    description: "Set Someone Nickname or Yourself",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    const { senderID, messageReply, mentions, body, threadID } = event;
    const nickname = args[0];

    if (!nickname) {
        return api.sendMessage("Usage: setname <nickname>", threadID);
    }

    if (messageReply) {
        return api.changeNickname(nickname, threadID, messageReply.senderID, (err) => {
            if (err) {
                return api.sendMessage("Failed setting user New Nickname. Please add me as an admin and try again", threadID);
            }
            return api.sendMessage(`User Nickname Set Successfully`, threadID);
        });
    }

    if (mentions) {
        const mentionedUserID = Object.keys(mentions)[0];
        return api.changeNickname(nickname, threadID, mentionedUserID, (err) => {
            if (err) {
                return api.sendMessage("Fail setting name for mentioned user!. add me as an admin and try again", threadID);
            }
            return api.sendMessage(`Nickname set successful!`, threadID);
        });
    }

    return api.changeNickname(nickname, threadID, senderID, (err) => {
        if (err) {
            return api.sendMessage("Fail setting Your New Nickname. add me as an admin and try again", threadID);
        }
        return api.sendMessage(`Your new nickname is "${nickname}".`, threadID);
    });
};
