const Discord = require('discord.js');
module.exports = {
    name: '공지',
    category: "관리 명령어",
    description: '공지를 보내요.',
    run: async (client, message, args, ops) => {
        if (!message.member.roles.cache.has(ops.OWNERS)) return message.channel.send('봇 관리자만 사용할 수 있어요.');
        if (!args[1]) return message.channel.send('공지 내용을 입력해주세요.');
        const embed = new Discord.MessageEmbed()
        .setTitle('공지를 보낼까요?')
        .setColor('RANDOM')
        .addField('공지 내용', `\`\`\`\n${args.slice(1).join(' ')}\n\`\`\``)
        .setFooter(message.author.tag, message.author.displayAvatarURL())
        .setTimestamp()
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
                const noticeChannel = channel.guild.channels.find(ch => ch.name === '봇-공지');
                client.channels.cache.get(noticeChannel).send(setMention(ops, args[1]), {
                    embed: new Discord.MessageEmbed()
                    .setTitle(`${message.guild.name} 공지`)
                    .setDescription(args.slice(2).join(' '))
                    .setColor('RANDOM')
                    .setFooter(message.author.tag, message.author.displayAvatarURL())
                    .setTimestamp()
                });
                embed.setTitle('공지를 보냈어요.')
                .setColor('RANDOM')
                .setTimestamp()
                m.edit({
                    embed: embed
                });
            } else {
                embed.setTitle('공지 전송이 취소되었어요.')
                .setColor('RANDOM')
                .setTimestamp()
                m.edit({
                    embed: embed
                });
            }
        });
    }
}
