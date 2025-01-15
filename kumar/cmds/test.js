module.exports.config = {
    name: "test",
    prefix: false,
    admin: false,
    description: "Lists all available commands",
    credits: "Created by Kumar"
};

module.exports.run = async ({ api, event, args }) => {
    const msg = args.join(" ") || "What Are We testing today";
    await api.sendMessage(msg, event.threadID);
}
