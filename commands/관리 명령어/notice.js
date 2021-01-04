const Discord = require('discord.js');
module.exports = {
    name: '공지',
    category: "관리 명령어",
    description: '공지를 보내요.',
    run: async (client, message, args, ops) => {
        let channelName = message.guild.channels.cache.find(channel => channel.name.toLowerCase().includes("화베"))

        let i;
        for(i = 0;i <= 1; i++){
            if(channelName){
                channelName.send(message)
            }
        }
    }
}
