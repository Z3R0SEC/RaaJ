module.exports.config = {
    name: "add",
    admin: false,
    description: "Add user to group with uid",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    if (args.length === 0) return api.sendMessage("Usage: add <uid>", event.threadID);

    const uid = args[0];
    api.addUserToGroup(uid, event.threadID, (err) => {
        if (err) return api.sendMessage("Failed while adding user to group. add me as admin and try again", event.threadID);
        api.sendMessage(`User: ${uid} Has been added to group`, event.threadID);
    });
};
