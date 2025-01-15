/**

Copyright (c) 2025 Z3R0SEC. All rights reserved.

- This software is provided "as is" without warranty of any kind.
- Use of this software is at your own risk.
- Editing the code without proper understanding may cause unintended consequences.
- Redistribution of this software is strictly prohibited and/or requires retaining the original credits.
- By using this software, you acknowledge that you have read and understood these terms.

**/

const moment = require('moment');

function echo(text) {
    process.stdout.write(text + '\n');
}
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underscore: "\x1b[4m",
    blink: "\x1b[5m",
    reverse: "\x1b[7m",
    hidden: "\x1b[8m",

    fg: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        orange: "\x1b[38;5;208m",
        gray: "\x1b[90m",
    },
    bg: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
    }
};

function logger(message, type = 'info') {
    const time = moment().format('HH:mm');

    switch (type.toLowerCase()) {
        case 'info':
            echo(`│ ${colors.fg.blue}[INFO]${colors.reset} [${time}] ${colors.fg.cyan}${message}${colors.reset}`);
            break;
        case 'warn':
            echo(`│ ${colors.fg.red}[${colors.fg.orange}WARN${colors.fg.red}]${colors.reset} [${time}] ${colors.fg.yellow}${message}${colors.reset}`);
            break;
        case 'error':
            echo(`│ ${colors.fg.red}[\u0046\u0041\u0049\u004C]${colors.reset} [${time}] ${colors.fg.red}${message}${colors.reset}`);
            break;
        case 'bot':
            echo(`│ ${colors.fg.green}[${colors.fg.gray}\u0049\u004E\u0046\u004F${colors.fg.green}] ${colors.fg.orange}${message}${colors.reset}`);
            break;
        case 'msg':
            echo(`│ ${colors.fg.green}[${colors.fg.gray}NOTE${colors.fg.green}]${colors.reset} [${time}] ${colors.fg.orange}${message}${colors.reset}`);
            break;
        case 'event':
            echo(`│ ${colors.fg.green}[${colors.fg.gray}SHOW${colors.fg.green}]${colors.reset} [${time}] ${colors.fg.orange}${message}${colors.reset}`);
            break;
        case 'success':
            echo(`│ ${colors.fg.green}[\u004C\u0055\u0043\u004B]${colors.reset} [${time}] ${colors.fg.green}${message}${colors.reset}`);
            break;
        case 'events':
            echo(`│ ${colors.fg.green}[\u0043\u0052\u0045\u0044]${colors.fg.gray} \u0043\u0052\u0045\u0044\u0049\u0054\u0053 \u0054\u004f:${colors.fg.green} ${message}${colors.reset}     │`);
            break;
        case 'load':
            echo(`│ ${colors.fg.blue}[${colors.fg.orange}PAID${colors.fg.blue}] ${colors.fg.white}COMMAND ${colors.fg.red}${message}${colors.reset}`);
            break;
        default:
            echo(`│ ${colors.fg.gray}[DATA]${colors.reset} [${time}] ${colors.fg.white}${message}${colors.reset}`);
            break;
    }
}

module.exports = logger;

// This Code Was Written By Me Z3R0SEC. Special Thanks to
// Cyber Paladins for Contributing in the success of this
// Project. Do not Change Credits for any Reason Unless
// Authorized By Me!
