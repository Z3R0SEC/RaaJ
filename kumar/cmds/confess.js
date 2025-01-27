module.exports.config = {
    name: "confess",
    admin: false,
    description: "Send an anonymous message to a specific user",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    const confessToUid = args[0];  // The UID of the person you're confessing to
    const message = args.slice(1).join(" ");  // The rest is the message
    const userID = event.senderID;
    const userInfo = await api.getUserInfo(userID);

    if (!confessToUid || !message) {
        api.sendMessage("Usage: confess <userID> <message>", event.threadID);
        return;
    }

    // Get the name of the sender or set as "Unknown"
    const senderName = userInfo[userID].name || "Unknown";

    // Send the anonymous message
    api.sendMessage({
        body: `Confession from ${senderName === "Unknown" ? "someone" : senderName}:\n\n${message}`,
    }, confessToUid, (err) => {
        if (err) {
            api.sendMessage(`Failed to send confession to UID: ${confessToUid}`, event.threadID);
        } else {
            api.sendMessage("Your confession has been sent successfully.", event.threadID);
        }
    });
};
