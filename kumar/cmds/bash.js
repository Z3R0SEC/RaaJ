const { exec } = require("child_process");

module.exports.config = {
    name: "bash",
    admin: true,  // Only allow admins to use this command
    description: "Executes a bash shell command",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    const command = args.join(" ");
    if (!command) return api.sendMessage("Usage: bash <command>", event.threadID);

    exec(command, (err, stdout, stderr) => {
        if (err) {
            return api.sendMessage(`Error executing command: ${err.message}`, event.threadID);
        }
        if (stderr) {
            return api.sendMessage(`Bash Error: ${stderr}`, event.threadID);
        }
        api.sendMessage(`Bash Output:\n\`\`\`\n${stdout}\n\`\`\``, event.threadID);
    });
};
