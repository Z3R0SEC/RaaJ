/**

Copyright (c) 2025 Z3R0SEC. All rights reserved.

- This software is provided "as is" without warranty of any kind.
- Use of this software is at your own risk.
- Editing the code without proper understanding may cause unintended consequences.
- Redistribution of this software is strictly prohibited and/or requires retaining the original credits.
- By using this software, you acknowledge that you have read and understood these terms.

**/

const fs = require('fs');
const path = require('path');
const logger = require('./logger');
const configPath = path.join(__dirname, '../config.json');

const readConfig = () => {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
};

const readEventS = (eve) => {
     return eve;
};

const writeConfig = (newConfig) => {
    fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2), 'utf8');
};

module.exports = {
    readConfig,
    readEventS,
    writeConfig
};

// This Code Was Written By Me Z3R0SEC. Special Thanks to
// Cyber Paladins for Contributing in the success of this
// Project. Do not Change Credits for any Reason Unless
// Authorized By Me!

