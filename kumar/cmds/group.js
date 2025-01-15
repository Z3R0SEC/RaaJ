module.exports.config = {
    name: "group",
    admin: false,
    description: "Manage group (rename, promote, demote, add, remove, setEmoji, setColor, setApproval, info)",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    // Get the list of admins in the thread
    const threadInfo = await api.getThreadInfo(event.threadID);
    const isAdmin = threadInfo.adminIDs.some(admin => admin.id === event.senderID);

    if (!isAdmin) {
        return api.sendMessage("Only group admins can use this command.", event.threadID);
    }

    // Check for valid sub-command (rename, promote, demote, add, remove, emoji, color, approval, info)
    const action = args[0]?.toLowerCase();

    if (!action || !["rename", "promote", "demote", "add", "remove", "emoji", "color", "approval", "info"].includes(action)) {
        return api.sendMessage("Usage: group <rename|promote|demote|add|remove|emoji|color|approval|info> [args]", event.threadID);
    }

    // Case: Rename group
    if (action === "rename") {
        const newName = args.slice(1).join(" ");
        if (!newName) return api.sendMessage("Usage: group rename <new group name>", event.threadID);

        api.setTitle(newName, event.threadID, (err) => {
            if (err) return api.sendMessage("Failed to rename the group.", event.threadID);
            api.sendMessage(`Group name has been changed to: ${newName}`, event.threadID);
        });
    }

    // Case: Promote user to admin
    if (action === "promote") {
        const uid = args[1];
        if (!uid) return api.sendMessage("Usage: group promote <uid>", event.threadID);

        api.changeAdminStatus(event.threadID, uid, true, (err) => {
            if (err) return api.sendMessage("Failed to promote user. Make sure I'm an admin.", event.threadID);
            api.sendMessage(`User: ${uid} has been promoted to admin.`, event.threadID);
        });
    }

    // Case: Demote user from admin
    if (action === "demote") {
        const uid = args[1];
        if (!uid) return api.sendMessage("Usage: group demote <uid>", event.threadID);

        api.changeAdminStatus(event.threadID, uid, false, (err) => {
            if (err) return api.sendMessage("Failed to demote user. Make sure I'm an admin.", event.threadID);
            api.sendMessage(`User: ${uid} has been demoted from admin.`, event.threadID);
        });
    }

    // Case: Add user to group
    if (action === "add") {
        const uid = args[1];
        if (!uid) return api.sendMessage("Usage: group add <uid>", event.threadID);

        api.addUserToGroup(uid, event.threadID, (err) => {
            if (err) return api.sendMessage("Failed to add user to group. Make sure I'm an admin.", event.threadID);
            api.sendMessage(`User: ${uid} has been added to the group.`, event.threadID);
        });
    }

    // Case: Remove user from group
    if (action === "remove") {
        const uid = args[1];
        if (!uid) return api.sendMessage("Usage: group remove <uid>", event.threadID);

        api.removeUserFromGroup(uid, event.threadID, (err) => {
            if (err) return api.sendMessage("Failed to remove user from group. Make sure I'm an admin.", event.threadID);
            api.sendMessage(`User: ${uid} has been removed from the group.`, event.threadID);
        });
    }

    // Case: Set Group Emoji
    if (action === "emoji") {
        const emoji = args[1];
        if (!emoji) return api.sendMessage("Usage: group emoji <emoji>", event.threadID);

        api.setEmoji(event.threadID, emoji, (err) => {
            if (err) return api.sendMessage("Failed to set group emoji. Make sure I'm an admin.", event.threadID);
            api.sendMessage(`Group emoji has been set to: ${emoji}`, event.threadID);
        });
    }

    // Case: Set Group Color
    if (action === "color") {
        const color = args[1];
        if (!color) return api.sendMessage("Usage: group color <hex color code or color name>", event.threadID);

        api.setColor(event.threadID, color, (err) => {
            if (err) return api.sendMessage("Failed to set group color. Make sure I'm an admin.", event.threadID);
            api.sendMessage(`Group color has been set to: ${color}`, event.threadID);
        });
    }

    // Case: Set Group Approval Mode (for approval of new members)
    if (action === "approval") {
        const mode = args[1]?.toLowerCase();
        if (!mode || !["on", "off"].includes(mode)) {
            return api.sendMessage("Usage: group approval <on|off>", event.threadID);
        }

        const isOn = mode === "on";

        api.setApprovalMode(event.threadID, isOn, (err) => {
            if (err) return api.sendMessage("Failed to set approval mode. Make sure I'm an admin.", event.threadID);
            api.sendMessage(`Group approval mode has been turned ${isOn ? "on" : "off"}.`, event.threadID);
        });
    }

    // Case: Get group info
    if (action === "info") {
        const groupInfo = await api.getThreadInfo(event.threadID);
        const groupName = groupInfo.name;
        const memberCount = groupInfo.participantIDs.length;
        const admins = groupInfo.adminIDs.map(admin => admin.name).join(", ");

        const infoMessage = `
            Group Name: ${groupName}
            Member Count: ${memberCount}
            Admins: ${admins}
        `;
        api.sendMessage(infoMessage, event.threadID);
    }
};
