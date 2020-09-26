const { Client, MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const API = require("discord.js");
const client = new Client({
    disableEveryone: true
});
const config = require('./config');
const fs = require("fs");
const request = require('request');
const response = require('response');
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
const { bot, messageEmbed, sendNotice, addChannel } = require('./Core.js')


client.commands = new API.Collection();
client.aliases = new API.Collection();
client.categories = fs.readdirSync("./commands/");


["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on('ready', () => {
  console.log(`${client.user.tag}으로 접속을 완료하였습니다.`);
  client.user.setActivity('화베야 도움', { type: 'WATCHING' })
});
let prefix = process.env.prefix;

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'access');
  if (!channel) return;
  channel.send(` 오신것을 환영합니다, ${member}`);
});
client.on('messageUpdate', (oldMessage, newMessage) => {

  if (oldMessage.content === 'Pinging...') {

      var oldMessageTimestamp = oldMessage.createdTimestamp;
      var newMessageTimestamp = newMessage.editedTimestamp;

      newMessage.edit(`Pong! Ponged back the ping in ${Math.floor(newMessageTimestamp - oldMessageTimestamp)} milliseconds!`);
  }
});

client.on('message', message => {
  if(message.channel.type == 'dm') return
  if(!message.content.startsWith(prefix)) return
  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content === prefix + ` 핑`) {
    message.channel.send('Pinging...').then(message => {
        message.edit('Pong! Ponged back the ping in milliseconds!');
    })
    return
  }
   if (message.content === `${prefix} 프사`) {
    message.reply(message.author.displayAvatarURL());
    return
  }
  if (message.content === prefix + ` 개발자`) {
    message.reply('int:tm: 에서 개발되었어요.');
    return
  }

  if (message.content == prefix + ` 초대`) {
    message.reply('https://discord.com/api/oauth2/authorize?client_id=744793044678737961&permissions=8&scope=bot');
    return
  }
  if (message.mentions.users.some(x => x.id == client.user.id ) &&  !message.author.bot) {
    message.reply('저를 부르셨나요? 도움이 필요하시다면 `화베야 도움`을 입력해보세요!');
    return
  }

  if (message.content === prefix + ` 도움`) {
    const help = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('화베야 도움')
    .setAuthor('WhiteBear')
    .setDescription('WhiteBear의 도움말이에요.')
    .addFields(
      { name: '도움', value: 'WhiteBear의 사용법을 알려드려요.' },
      { name: '\u200B', value: '\u200B' },
      { name: '서포트', value: '서포트 서버의 링크를 보내요.', inline: true },
      { name: '청소 (갯수)', value: '(갯수)만큼의 메시지를 삭제해요.', inline: true },
      { name: '초대', value: '초대 링크를 보내요.', inline: true },
      { name: '정보 (사람 맨션)', value: '맨션한 사람의 정보를 알려드립니다.', inline: true },
      { name: '서버정보', value: '해당 메시지를 보낸 서버의 정보를 알려드립니다.', inline: true },
      { name: '레벨', value: '자신의 레벨을 알려줍니다. 만약 레벨 뒤에 사람을 맨션한다면 그 사람의 레벨을 알려줍니다.', inline: true },
      { name: '정보 (사람 맨션)', value: '맨션한 사람의 정보를 알려드립니다.', inline: true },
      { name: '도움 엔터테인먼트', value: '엔터테인먼트 명령어들을 알려드립니다.', inline: true },
      { name: '$(말)', value: 'WhiteBear과의 일상대화가 가능합니다.', inline: true}
    )
    .setTimestamp()
    .setFooter('2020 int ©. All Rights Reserved.');
  

    message.channel.send(help)
    return
  }
  if (message.content === prefix + ` 도움 엔터테인먼트`) {
      const entertainment = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('화베야 도움 엔터테인먼트')
      .setAuthor('WhiteBear')
      .setDescription('WhiteBear의 엔터테인먼트 도움말이에요.')
      .addFields(
        { name: '짤', value: '랜덤한 짤을 보내요.', inline: true },
        { name: '가위바위보', value: '화베와 가위바위보를 해요.', inline: true },
      )
      .setTimestamp()
      .setFooter('2020 int ©. All Rights Reserved.');
  
      message.channel.send(entertainment);
      return
  }

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (!db[message.author.id]) db[message.author.id] = {
      xp: 0,
      level: 0
  }
  db[message.author.id].xp++;
  let userInfo = db[message.author.id];
  if(userInfo.xp > 100) {
      userInfo.level++
      userInfo.xp = 0
      message.reply("레벨업 하셨습니다.")
  }
  if(cmd === "레벨") {
      let userInfo = db[message.author.id];
      let member = message.mentions.members.first();
      let embed = new Discord.MessageEmbed()
          .setColor(0x4286f4)
          .addField("Level", userInfo.level)
          .addField("XP", userInfo.xp+"/100");
      if(!member) return message.channel.send(embed)
      let memberInfo = db[member.id]
      let embed2 = new Discord.MessageEmbed()
          .setColor(0x4286f4)
          .addField("Level", memberInfo.level)
          .addField("XP", memberInfo.xp+"/100")
      message.channel.send(embed2)
  }
  fs.writeFile("./database.json", JSON.stringify(db), (x) => {
      if (x) console.error(x)
  });
  
  if (cmd.length === 0) return;
  
  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (command) {
      command.run(client, message, args);
  }
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
if (message.content.startsWith(`${prefix} 공지 `)) {

        if (message.author.id == config.OWNERS) {

            message.channel.send(messageEmbed.setTitle(`🔍 ${bot.guilds.cache.size}개의 서버에 공지가 발신됩니다`).addField(`공지의 내용은 다음과 같습니다`, `\n${message.content.substring(`${prefix} 공지 `.length)}\n`).setColor("#47CDFF").setFooter('by int')).then((noticeEmbed) => {

                noticeEmbed.react('⭕'); noticeEmbed.react('❌'); noticeEmbed.awaitReactions((reaction, user) => (reaction.emoji.name === '⭕' || reaction.emoji.name === '❌') && user.id === message.author.id, { max: 1 }).then((collected) => {

                    if (collected.array()[0].emoji.name === '⭕') {

                        messageEmbed.fields = []; sendNotice(message, message.content.substring(`${prefix} 공지 `.length), noticeEmbed).catch(() => noticeEmbed.edit(messageEmbed.addField('⚠ 오류가 발생하였습니다', '코드에 손상이 있는지 확인해주세요.').setColor("#FFD500").setFooter('by int'))) 

                            let noticeResult = ``; bot.noticeGuilds.forEach(i => { if (!i[2]) return;  noticeResult += `${i[0]}: ${i[2]} \n` }); noticeResult += '위에 적혀있지 않은 서버는 정상적으로 발신되었습니다.'

                            noticeEmbed.edit(messageEmbed.setTitle('✅ 공지 발신이 완료되었습니다!').addField('결과:', `\`\`\`\n${noticeResult}\`\`\``).setColor("#83FF83").setFooter('by int')); messageEmbed.fields = [];

                    } else {

                        messageEmbed.fields = []; noticeEmbed.edit(messageEmbed.setTitle('❌ 공지 발신이 취소되었습니다').setColor("#FF4747").setFooter('by int'))

                    }

                })

            })

        } else {

            message.channel.send(messageEmbed.setTitle('⚠ 당신은 봇 관리자로 등록되어있지 않습니다.').setColor("#FFD500").setFooter('by int'))
    
        }

    } else if (message.content === `${prefix} 채널설정`) {

        addChannel(message).catch((e) => { if (e) return message.channel.send(e)}); message.channel.send(`✅ 공지를 수신할 채널이 <#${message.channel.id}> 로 설정되었습니다!`); 
        
    }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
  if (message.content.startsWith(prefix + " eval")) {
    if(message.author.id !== config.OWNERS[0]){
      const noeval = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('eval fail')
      .setAuthor('WhiteBear')
      .setDescription('관리자 권한이 없어 실행이 불가능해요.')
      .setTimestamp()
      .setFooter('2020 int ©. All Rights Reserved.');
    
  
      message.channel.send(noeval)
      return
    };
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

 const pingpongprefix = '$'
  if(message.content.split(' ')[0] != pingpongprefix) return;
  
    require("node-fetch")(`https://builder.pingpong.us/api/builder/5f367a9de4b00e31991574f1/integration/v0.2/custom/${message.author.id}`,
    {
      method: "POST",
      headers:{
                "Authorization": `Basic a2V5OjczOWMzNWI1NzFiOGJlYjMwMjlmOWU3MmY0Y2Y0YzAx`,
                "Content-Type" : "application/json"
              },
      body: JSON.stringify({
        request:{
                  query: message.content.split(' ')
                }
      })
    }
    )
    .then(r => r.json())
    .then(
      ({ response: { replies: [{ text }] } }) => {message.reply(text)})
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

client.login(process.env.token);
