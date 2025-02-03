const axios = require('axios');

module.exports.config = {
    name: "dark",
    admin: false,
    description: "Sends a Dark Joke",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event }) => {
    try {
        const response = await axios.get('https://mota-api.x10.bz/api/jokes');
        const data = await response.data;

        if (data.joke) {
            api.sendMessage(data.joke, event.threadID);
        } else {
            api.sendMessage(`${data.error}\n:-)`, event.threadID);
        }
    } catch (error) {
        api.sendMessage('Shared Enough Jokes Already', event.threadID);
    }
};
