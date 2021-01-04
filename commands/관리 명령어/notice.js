const Discord = require('discord.js');
const manager = require('./manager.json');
module.exports = {
    name: '공지',
    category: "관리 명령어",
    description: '공지를 보내요.',
    run: async (client, message, args, ops) => {
        let i;
        for(i=0;i<manager.manager.length;i++){
            if(message.author.id != manager.manager[i]){
                return message.channel.send('봇의 관리자만 사용할 수 있어요.')
            }
        }
        let channelName = message.guild.channels.cache.find(channel => channel.name.toLowerCase().includes("화베")) 
        
        if(!channelName){
            return message.channel.send('메시지를 전송할 채널이 존재하지 않습니다.')
        }
        let title = args[2];
        let msg = args[3];
        const noticeEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('WhiteBear 공지')
        .setAuthor('WhiteBear')
        .addFields(
          { name: `${title}`, value: `${msg}`, inline: true },
        )
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        
        channelName.send(noticeEmbed)
        return
    }
}
