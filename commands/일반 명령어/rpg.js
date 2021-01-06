const fs = require('fs');
const Discord = require('discord.js');
const manager = require('./manager.json');
module.exports = {
    name: '도박',
    category: "일반 명령어",
    description: '화베야 도박 {돈}',
    run: async (client, message, args, ops) => {
        let userInfo = JSON.parse(fs.readFileSync("./money.json", "utf8"));
        let user = userInfo[message.author.id]
        if(!user.user)
        if(args[0] == "가입") {
            if(userInfo.user){
                return message.channel.send("이미 도박에 가입한 유저입니다")
            }
            fs.writeFile("./money.json", JSON.stringify(user), (err) => {
                if (x) console.error(x)
            });
        }
    }
}