const fs = require('fs');
const Discord = require('discord.js');
const userInfo = require('./money.json');
module.exports = {
    name: '도박',
    category: "일반 명령어",
    description: '화베야 도박 {돈}',
    run: async (client, message, args, ops) => {
        let id = message.author.id
        let user = userInfo[user]
        if(args[0] == "가입") {
            if(userInfo.user){
                return message.channel.send("이미 도박에 가입한 유저입니다")
            } else {
                fs.writeFile("./money.json", user[id], (err) => {
                    if (err) {
                            return console.error(err)
                    } else {
                        return message.channel.send("가입을 완료하였습니다.").then(
                            console.log("가입 완료 : " + user)
                        )
                    }
                });
            }
        }
        if(!userInfo.user.id) {
            return message.channel.send("가입되지 않은 유저입니다.").then(
                message.channel.send("화베야 도박 가입 을 통해 가입하세요.")
            )
        }
    }
}
