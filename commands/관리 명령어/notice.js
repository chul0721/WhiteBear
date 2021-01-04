const Discord = require('discord.js');
module.exports = {
    name: '공지',
    category: "관리 명령어",
    description: '공지를 보내요.',
    run: async (client, message, args, ops) => {
        let channelName = message.guild.channels.cache.find(channel => channel.name.toLowerCase().includes("화베"))
        if(!channelName) return
        let title = args[2]
        let msg = args[3]

        const noticeEmbed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('WhiteBear 공지')
        .setAuthor('WhiteBear')
        .setDescription('공지 사항')
        .addFields(
          { name: `${title}`, value: `${msg}`, inline: true },
        )
        .setTimestamp()
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        
        message.channel.send(noticeEmbed)
        return
    }
}
