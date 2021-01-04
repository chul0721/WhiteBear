const Discord = require('discord.js');
module.exports = {
    name: '공지',
    category: "관리 명령어",
    description: '공지를 보내요.',
    run: async (client, message, args, ops) => {
        const prefix = "화베야 ";
        const args = message.content.trim().split(/ +/g);
        const msg = args[0].slice(prefix.length).toLowerCase(); // case INsensitive, without prefix

        message.reply(`${msg}`)
    }
}
