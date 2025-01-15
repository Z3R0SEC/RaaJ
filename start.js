const { spawn } = require('child_process');
const path = require('path');

const botPath = path.join(__dirname, 'main.js');

function startBot() {
    const botProcess = spawn('node', [botPath]);

    botProcess.stdout.on('data', (data) => {
        console.log(`${data}`);
    });

    botProcess.stderr.on('data', (data) => {
        console.error(`Bot error: ${data}`);
    });

    botProcess.on('close', (code) => {
        console.log(`Bot exited with code: ${code}`);

        if (code !== 0) {
            console.log("Bot crashed. Restarting...");
            setTimeout(startBot, 3000);
        } else {
            console.log("Bot stopped gracefully. No restart needed.");
        }
    });
}

startBot();
