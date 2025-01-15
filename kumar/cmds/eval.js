module.exports.config = {
    name: "eval",
    admin: true,  // Only allow admins to use this command
    description: "Executes JavaScript code",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event, args }) => {
    // Join the args to create the eval command
    const code = args.join(" ");
    if (!code) return api.sendMessage("Usage: eval <JavaScript code>", event.threadID);

    try {
        const result = await eval(code);
        api.sendMessage(`Eval Result:\n\`\`\`js\n${result}\n\`\`\``, event.threadID);
    } catch (error) {
        api.sendMessage(`Error while executing code:\n\`\`\`js\n${error}\n\`\`\``, event.threadID);
    }
};
