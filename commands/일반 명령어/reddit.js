const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "짤",
    category: "일반 명령어",
    description: "레딧에서 가져온 밈을 출력합니다",
    run: async (_client, message, _args) => {
        const subReddits = ["dankmeme", "meme", "me_irl"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setURL(`https://reddit.com/r/${random}`);

        message.channel.send(embed);
    }
}