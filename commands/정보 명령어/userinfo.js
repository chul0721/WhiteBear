const { MessageEmbed, DiscordAPIError, Discord, bot } = require("discord.js")

module.exports = {
    name: "정보",
    category: "일반 명령어",
    description: "멘션한 유저의 정보를 출력합니다",
    run: async (bot, message, args) => {
        let inline = true
        let resence = true
        const status = {
            online: "<:online:742361976469979207> 온라인",
            idle: "<:idle:742364145822990396> 자리 비움",
            dnd: "<:dnd:742361947143667732> 다른 용무 중",
            offline: "<:offline:742362046481432658> 오프라인"
          }
            
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let target = message.mentions.users.first() || message.author
    
    if (member.user.bot === true) {
        bot = "<:bot:742348708074749964> 봇";
      } else {
        bot = "<:discord:742021671497629737> 유저";
      }
    
                let embed = new MessageEmbed()
                    .setAuthor(member.user.username)
                    .setThumbnail((target.displayAvatarURL))
                    .setColor("#0099ff")
                    .addField("유저태그", `${member.user.tag}`, inline)
                    .addField("유저 ID", member.user.id, inline)
                    .addField("별명", `${member.nickname !== null ? `<a:yes:742568893351985303> 별명: ${member.nickname}` : "<a:no:742569138764906628> 별명 없음"}`, true)
                    .addField("봇임?", `${bot}`,inline, true)
                    .addField("상태", `${status[member.user.presence.status]}`, inline, true)
                    .addField("지금 하는 게임", `${member.user.presence.game ? `🎮 ${member.user.presence.game.name}` : "<a:no:742569138764906628> 아무 게임도 안 하는중"}`,inline, true)
                    .addField("역할들", `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(" **|** ") || "<a:no:742569138764906628> 역할 없음"}`, true)
                    .addField("생일", member.user.createdAt)
                    .setFooter(`${member.user.username} 의 정보`)
                    .setTimestamp()
        
                message.channel.send(embed);
        }
    
    
}
