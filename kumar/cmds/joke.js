const axios = require('axios');

module.exports.config = {
    name: "dark",
    admin: false,
    description: "Sends a Dark Joke",
    credits: "Z3R0SEC"
};

module.exports.run = async ({ api, event }) => {
    try {
        const response = await axios.get('https://v2.jokeapi.dev/joke/Dark');
        const data = await response.json();

        if (data.type === 'single') {
            api.sendMessage(data.joke, event.threadID);
        } else {
            api.sendMessage(`${data.setup}\n${data.delivery}`, event.threadID);
        }
    } catch (error) {
        api.sendMessage('Shared Enough Jokes Already', event.threadID);
    }
};
