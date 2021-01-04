const Discord = require('discord.js');
module.exports = {
    name: '공지',
    category: "관리 명령어",
    description: '공지를 보내요.',
    run: async (client, message, args, ops) => {
        const prefix = "화베야 공지 ";
        const msg = args[0].slice(prefix.length).toLowerCase(); // case INsensitive, without prefix
        let channelName = message.guild.channels.cache.find(channel => channel.name.toLowerCase().includes("화베"))

        if(channelName){
            channelName.send(msg)
        }
    }
}
