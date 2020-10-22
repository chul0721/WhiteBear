const { RichEmbed, MessageEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

const chooseArr = ["🗻", "📰", "✂"];

module.exports = {
    name: "가위바위보",
    category: "일반 명령어",
    description: "이모지로 가위바위보 하는 게임입니다",
    usage: "-가위바위보, 이모지 선택",
    run: async (client, message, args) => {
        if(!message.content.startsWith(process.env.prefix)) return 
        const embed = new MessageEmbed()
            .setColor("#ffffff")
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL)
            .setDescription("하나의 이모지를 골라주세요")
            .setTimestamp();

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        const result = await getResult(reacted, botChoice);

        embed
            .setDescription("")
            .addField(result, `나: ${reacted} vs WhiteBear: ${botChoice}`);

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "🗻🦾" && clientChosen === "✂") ||
                (me === "📰" && clientChosen === "🗻") ||
                (me === "✂" && clientChosen === "📰")) {
                    return "졌다....";
            } else if (me === clientChosen) {
                return "무승부";
            } else {
                return "제가 이겼네요";
            }
        }
    }
}
