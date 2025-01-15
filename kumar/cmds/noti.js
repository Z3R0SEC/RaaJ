const { readConfig, writeConfig } = require('../../includes/handleConfig');

module.exports.config = {
    name: "noti",
    admin: true,
    description: "Send Noti To Group",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    const isAdmin = readConfig.adminIds[0];

    const customMessage = args.join(" ");
    if (!customMessage) {
        return api.sendMessage("Usage: noti <message>", event.threadID);
    }

    const threadList = await api.getThreadList(100, null, ["INBOX"]);
    let sentCount = 0;

    async function sendMessage(threadID) {
        try {
            await api.sendMessage(customMessage, threadID);
            sentCount++;
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }

    for (const thread of threadList) {
        if (thread.isGroup && thread.threadID !== event.threadID) {
            await sendMessage(thread.threadID);
        }
    }

    api.sendMessage(`Successfully broadcasted message to ${sentCount} groups.`, event.threadID);
};
