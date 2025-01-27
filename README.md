# ChatMasterBot v1.1.0

<details>
  <summary>Version 1.0.0</summary>
  
  - Initial release of ChatMasterBot
  - Basic command structure for Facebook Messenger
  - Built with `ws3-fca` module
  - Admin and public command features

</details>

<details>
  <summary>Version 1.1.0</summary>

  - Added New Commands
  - Added Bot Auto Restart After 15 Hours.
  - Added Group DB To Save And Update Group Lists.
  - Handled Events
  - Added More And More Updates
</details>


## Collaboration:

**Hi 😅 My Name is Z3R0SEC And im kinda Like In Need Of Your Help. see im working on whatsapp message sender api. this api will send message to users with specified number. buh Since im Only a Software Developer I Have Little Knowledge Of Html And Css. So if you might wanna help Please [HIT ME UP HERE](https://wa.me/+27847611848). Thank You in Advance 🙃🙃**

## Overview

**ChatMasterBot** is a Facebook Messenger bot built using Node.js and the `ws3-fca` module. It allows users to create commands that interact with Facebook Messenger, enabling custom responses and functionality. ChatMasterBot supports both public and admin-only commands, making it suitable for group chats and personal use.

## Features

- Custom command system
- Admin-only command restriction
- Simple installation process
- Mobile-friendly (works with Termux)
- Lightweight and easy to extend
- auto block users who swears to bot

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) (v14+)
- [Git](https://git-scm.com/)
- Facebook account for bot login
- [Termux](https://termux.com/) (optional for mobile setup)

## Installation

### 1. Installation on Render

To deploy your bot on [Render](https://render.com):

1. **Fork this project** [Fork Me](https://github.com/Z3R0SEC/RaaJ/fork).
2. **Sign up on Render**: [Sign up here](https://render.com).
3. **Create a new web service**:
   - Choose or connect your GitHub account with Render.
   - Select your **bot repository** from the list.
4. Fill only the below information during setup:
   - **Build command**: `npm install`
   - **Start command**: `node start.js`
   - **Instance type**: Free

Once the deployment is complete, your bot will be live!

### 2. Installation on Termux

If you prefer to use Termux on mobile devices, follow these steps:

```bash
pkg update && pkg upgrade
pkg install nodejs git
git clone https://github.com/Z3R0SEC/chatmasterbot.git
cd chatmasterbot
npm install
node start
```

### Important Note:
**Change your `appstate.json`** file to your own appstate. The appstate provided in this repository is no longer active and should be replaced with your own credentials.

---

## Creating a Command

To create a new command for the bot, follow the example below. The command file should be placed inside the `/cmds` folder.

### Command Structure Example:

1. **Create a new file** in the `/cmds` folder. For example, `hello.js`.
2. **Define the command structure** using the following template:

```javascript
const { readConfig, writeConfig } = require("../../includes/handleConfig");

module.exports.config = {
    name: "hello",  // Command name
    admin: false,   // If true, only admins can use this command
    description: "Greets the user",  // Description of the command
    usage: "hello",  // Usage example
    credits: "YourName"  // Author of the command
};

module.exports.run = async ({ api, event, args }) => {
    const senderId = event.senderID;
    const userInfo = await api.getUserInfo(senderId);
    const userName = userInfo[senderId].firstName || "User";

    const greetingMessage = `Hello, ${userName}! How can I assist you today?`;

    api.sendMessage(greetingMessage, event.threadID);
};
```


## LICENSE:
**ChatMasterBot is licensed under the MIT License.**
