const Discord = require('discord.js');
const util = require('util');
module.exports = {
    name: 'eval',
    category: '관리 명령어',
    description: 'JavaScript 코드를 바로 실행해요. (개발자만 가능)',
    run: async (client, message, args, db) => {
        if (!['687866011013218349', '647736678815105037'].includes(message.author.id)) return message.channel.send(`${client.user.username} 개발자만 사용할 수 있어요.`);
        let input = args.slice(1).join(' ');
        if (!input) return message.channel.send('내용을 써 주세요!');
        const code = `
const Discord = require('discord.js');
const fs = require('fs');
const util = require('util');
const os = require('os');
const dotenv = require('dotenv');
const http = require('http');
const qs = require('querystring');
const url = require('url');

${input}`;
        const embed = new Discord.MessageEmbed()
            .setTitle(`Evaling...`)
            .setColor(0xffff00)
            .addField('Input', '```js\n' + args.slice(1).join(' ') + '\n```')
            .setFooter(message.author.tag, message.author.avatarURL({
                dynamic: true
            }))
            .setTimestamp()
        let m = await message.channel.send({
            embed: embed
        });
        try {
            let output = eval(code);
            let type = typeof output;
            if (typeof output !== "string") {
                output = util.inspect(output);
            }
            if (output.length >= 1020) {
                output = `${output.substr(0, 1010)}...`;
            }
            while (true) {
                if (!output.includes(process.env.TOKEN)) {
                    break;
                }
                output = output.replace(process.env.TOKEN, 'Secret');
            }
            const embed2 = new Discord.MessageEmbed()
                .setTitle('Eval result')
                .setColor(0x00ffff)
                .addField('Input', '```js\n' + args.slice(1).join(' ') + '\n```')
                .addField('Output', '```js\n' + output + '\n```')
                .addField('Type', '```js\n' + type + '\n```')
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            m.edit({
                embed: embed2
            });
        } catch (err) {
            const embed3 = new Discord.MessageEmbed()
                .setTitle('Eval error...')
                .setColor(0xff0000)
                .addField('Input', '```js\n' + args.slice(1).join(' ') + '\n```')
                .addField('Error', '```js\n' + err + '\n```')
                .setFooter(message.author.tag, message.author.avatarURL({
                    dynamic: true
                }))
                .setTimestamp()
            m.edit({
                embed: embed3
            });
        }
    }
}
