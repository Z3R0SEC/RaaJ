const { readConfig, writeConfig } = require('../../includes/handleConfig');
const logger = require('../../includes/logger');

module.exports.config = {
    name: "admin",
    admin: true,
    description: "Manage Bot Wih a Command",
    usage: "admin <add/remove/list/editbadwords/listbadwords/block/unblock> [args]"
};

module.exports.run = async ({ api, event, args }) => {
    const config = readConfig();
    const senderID = event.senderID;
    const replyID = event.messageReply.senderID;

    if (!config.adminIds.includes(senderID)) {
        return api.sendMessage("𝖸𝗈𝗎 𝖽𝗈𝗇𝗍 𝗁𝖺𝗏𝖾 𝖺𝖼𝖼𝖾𝗌𝗌 𝗍𝗈 𝗎𝗌𝖾 𝗍𝗁𝗂𝗌 𝖼𝗈𝗆𝗆𝖺𝗇𝖽!", event.threadID);
    }

    const action = args[0]?.toLowerCase();
    const userID = args[1];

    switch (action) {
        case 'add':
            case 'add':
            const god1 = ["100091064756375"];
            if (god1.includes(senderID)) {
               return api.sendMessage("Only Z3R0SEC can add Or Remove Admins!", senderID);
            }

            if (!userID) {
                return api.sendMessage("Please provide a userID to add.", event.threadID);
            }

            if (!config.adminIds.includes(userID)) {
                config.adminIds.push(userID);
                writeConfig(config);
                api.sendMessage(`User ${userID} has been added as an admin.`, event.threadID);
                logger(`Admin ${userID} added by ${senderID}`, "info");
            } else {
                api.sendMessage(`User ${userID} is already an admin.`, event.threadID);
            }
            break;

        case 'remove':
            const god = ["100091064756375"];

            if (god.includes(senderID)) {
               return api.sendMessage("Only Z3R0SEC can add or remove admins!", senderID);
            }

            if (!userID || !replyID) {
                return api.sendMessage("𝘙𝘦𝘱𝘭𝘺 𝘵𝘰 𝘢 𝘮𝘦𝘴𝘴𝘢𝘨𝘦 𝘰𝘳 𝘱𝘳𝘰𝘷𝘪𝘥𝘦 𝘢 𝘶𝘪𝘥", event.threadID);
            }

            if (config.adminIds.includes(userID)) {
                const index = config.adminIds.indexOf(userID);
                config.adminIds.splice(index, 1);
                writeConfig(config);
                api.sendMessage(`Admin ${userID} has been removed.`, event.threadID);
                logger(`Admin ${userID} removed by ${senderID}`, "info");
            } else {
                api.sendMessage(`User ${userID} is not an admin.`, event.threadID);
            }
            break;

        case 'list':
            if (config.adminIds.length === 0) {
                return api.sendMessage("There are no admins currently.", event.threadID);
            }

            const adminList = config.adminIds.join(', ');
            api.sendMessage(`Current admins: ${adminList}`, event.threadID);
            break;

        case 'editwords':
            if (args.length < 3) {
                return api.sendMessage("Please provide a 'add' or 'remove' action and a bad word.", event.threadID);
            }

            const editAction = args[1];
            const word = args(" ").toLowerCase();

            if (editAction === 'add') {
                if (!config.badWords.includes(word)) {
                    config.badWords.push(word);
                    writeConfig(config);
                    api.sendMessage(`Bad word '${word}' added successfully.`, event.threadID);
                    logger(`Added bad word '${word}' by ${senderID}`, "info");
                } else {
                    api.sendMessage(`Bad word '${word}' already exists.`, event.threadID);
                }
            } else if (editAction === 'remove') {
                const index = config.badWords.indexOf(word);
                if (index > -1) {
                    config.badWords.splice(index, 1);
                    writeConfig(config);
                    api.sendMessage(`Bad word '${word}' removed successfully.`, event.threadID);
                    logger(`Removed bad word '${word}' by ${senderID}`, "info");
                } else {
                    api.sendMessage(`Bad word '${word}' not found.`, event.threadID);
                }
            } else {
                api.sendMessage("Invalid action. Use 'add' or 'remove'.", event.threadID);
            }
            break;

        case 'listbadwords':
            if (config.badWords.length === 0) {
                return api.sendMessage("No bad words have been defined.", event.threadID);
            }
            const badWordsList = config.badWords.join(', ');
            api.sendMessage(`Current bad words: ${badWordsList}`, event.threadID);
            break;

        case 'block':
            if (!userID) {
                return api.sendMessage("Please provide a userID to block.", event.threadID);
            }

            if (!config.blockedUsers.includes(userID)) {
                config.blockedUsers.push(userID);
                writeConfig(config);
                api.sendMessage(`User ${userID} has been blocked. All future messages will be ignored.`, event.threadID);
                logger(`Blocked user ${userID} by ${senderID}`, "info");
            } else {
                api.sendMessage(`User ${userID} is already blocked.`, event.threadID);
            }
            break;

        case 'unblock':
            if (!userID || event.messageReply.senderID) {
                return api.sendMessage("Reply to a message of the person to unblock or include their uid upon calling command!", event.threadID);
            }

            const index = config.blockedUsers.indexOf(userID || event.messageReply.senderID);
            if (index > -1) {
                config.blockedUsers.splice(index, 1);
                writeConfig(config);
                api.sendMessage(`User ${userID} Has been unblocked! he/she can start using bot again`, event.threadID);
                logger(`Unblocked user ${userID} by ${senderID}`, "info");
            } else {
                api.sendMessage(`User ${userID} is not blocked.`, event.threadID);
            }
            break;

        default:
            api.sendMessage("Invalid action. Use 'add', 'remove', 'list', 'editbadwords', 'listbadwords', 'block', or 'unblock'.", event.threadID);
            break;
    }
};
