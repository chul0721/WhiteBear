const fs = require('fs');
const Discord = require('discord.js');
const userInfo = require('./money.json');
module.exports = {
    name: '도박',
    category: "일반 명령어",
    description: '화베야 도박 {돈}',
    run: async (client, message, args, ops) => {
        let user = userInfo[message.author.id]
        if(args[0] == "가입") {
            if(userInfo.user){
                return message.channel.send("이미 도박에 가입한 유저입니다")
            }
            fs.writeFile("./money.json", JSON.stringify(user), (err) => {
                message.channel.send("가입을 완료하였습니다.");
                if (x) console.error(x)
            });
        }
        if(!userInfo.user){
            message.channel.send("화베야 도박 가입 으로 도박에 가입하세요.")
        }
    }
}
