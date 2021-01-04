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
        let channelName = guild.channels.cache.find(channel => channel.name.toLowerCase().includes("봇")) 
        
        if(!channelName){
            return message.channel.send('메시지를 전송할 채널이 존재하지 않습니다.')
        }
        let title = args[0];
        let msg = args[1];

        if(!title) return message.channel.send('공지 제목을 입력해주세요.')
        if(!msg) return message.channel.send('내용을 입력해주세요.')

        const embed = new Discord.MessageEmbed()
        .setAuthor('RANDOM')
        .setTitle('공지 내용이 맞나요?')
        .addField(`${title}`, `${msg}`, true)
        let m = await message.channel.send({
            embed: embed
        });
        await m.react('✅');
        await m.react('❌');
        const filter = (r, u) => u.id == message.author.id && (r.emoji.name == '✅' || r.emoji.name == '❌');
        const collector = m.createReactionCollector(filter, {
            max: 1
        });
        collector.on('end', async collected => {
            if (collected.first().emoji.name == '✅') {
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

                embed.setTitle('공지를 보냈어요.')
                    .setColor('RANDOM')
                    .setTimestamp()
                await m.edit({
                    embed: embed
                });
                return
            } else {
                embed.setTitle('공지 전송이 취소되었어요.')
                .setColor('RANDOM')
                .setTimestamp()
                m.edit({
                    embed: embed
                });
            }
        })
    }
}
