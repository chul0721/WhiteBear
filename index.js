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


client.commands = new API.Collection();
client.aliases = new API.Collection();
client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


client.on('ready', () => {
  console.log(`${client.user.tag}으로 접속을 완료하였습니다.`);
    setInterval(() => {

        switch (Math.floor(Math.random() * 6)) {
            case 0:
                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: `할로윈 기념 프사인 이것은 Cod3Breaker#0568님에 의해 만들어졌어요!`,
                        type: 'PLAYING'
                    }
                });
                break;
            case 1:
                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: `이 메시지는 10초마다 바뀝니다!`,
                        type: 'PLAYING'
                    }
                });
                break;
            case 2:
                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: `접두사를 "화베"라고 쓴 후 뒤에 말을 쓰면 일상대화가 가능합니다!`,
                        type: 'PLAYING'
                    }
                });
                break;
            case 3:
                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: `화베야 도움 이라고 입력해보세요!`,
                        type: 'PLAYING'
                    }
                });
                break;
            case 4:
                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: `화베의 문의/신고는 화베야 서포트!`,
                        type: 'PLAYING'
                    }
                });
                break;
            case 5:
                client.user.setPresence({
                    status: 'online',
                    activity: {
                        name: `화베를 자기 서버에 추가하고 싶다면? 화베야 초대!`,
                        type: 'PLAYING'
                    }
                });
                break;
        }
    }, 10000);
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
      { name: '도움 일반', value: '해당 메시지를 보낸 서버의 정보를 알려드립니다.', inline: true },
      { name: '도움 관리', value: '해당 메시지를 보낸 서버의 정보를 알려드립니다.', inline: true },
      { name: '도움 정보', value: '자신의 레벨을 알려줍니다.', inline: true },
      { name: '도움 엔터테인먼트', value: '엔터테인먼트 명령어들을 알려드립니다.', inline: true }
    )
    .setTimestamp()
    .setFooter('2020 int ©. All Rights Reserved.');
  

    message.channel.send(help)
    return
  }
   if (message.content === prefix + ` 도움 관리`) {
    const manage = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('화베야 도움')
    .setAuthor('WhiteBear')
    .setDescription('WhiteBear의 도움말이에요.')
    .addFields(
      { name: '도움', value: 'WhiteBear의 사용법을 알려드려요.' },
      { name: '\u200B', value: '\u200B' },
      { name: '서포트', value: '서포트 서버의 링크를 보내요.', inline: true },
      { name: '청소 (갯수)', value: '(갯수)만큼의 메시지를 삭제해요.', inline: true }
    )
    .setTimestamp()
    .setFooter('2020 int ©. All Rights Reserved.');
  

    message.channel.send(manage)
    return
  }
  if (message.content === prefix + ` 도움 정보`) {
    const info = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('화베야 도움')
    .setAuthor('WhiteBear')
    .setDescription('WhiteBear의 도움말이에요.')
    .addFields(
      { name: '도움', value: 'WhiteBear의 사용법을 알려드려요.' },
      { name: '\u200B', value: '\u200B' },
      { name: '정보 (사람 맨션)', value: '맨션한 사람의 정보를 알려드립니다.', inline: true },
      { name: '서버정보', value: '해당 메시지를 보낸 서버의 정보를 알려드립니다.', inline: true },
      { name: '레벨', value: '자신의 레벨을 알려줍니다.', inline: true }
    )
    .setTimestamp()
    .setFooter('2020 int ©. All Rights Reserved.');
  

    message.channel.send(info)
    return
  }
  if (message.content === prefix + ` 도움 일반`) {
    const normal = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('화베야 도움')
    .setAuthor('WhiteBear')
    .setDescription('WhiteBear의 도움말이에요.')
    .addFields(
      { name: '도움', value: 'WhiteBear의 사용법을 알려드려요.' },
      { name: '\u200B', value: '\u200B' },
      { name: '초대', value: '초대 링크를 보내요.', inline: true },
      { name: '레벨', value: '자신의 레벨을 알려줍니다.', inline: true },
      { name: '화베 {말}', value: '일상대화가 가능합니다!', inline: true }
    )
    .setTimestamp()
    .setFooter('2020 int ©. All Rights Reserved.');
  

    message.channel.send(normal)
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
 });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
client.on('message', message => {
    if(message.content.split(' ')[0] != `화베`) return;
    require("node-fetch")(`https://builder.pingpong.us/api/builder/${process.env.pingpongid}/integration/v0.2/custom/${message.author.id}`,
    {
      method: "POST",
      headers:{
                "Authorization": `${process.env.pingpongauth}`,
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

client.login(process.env.token);
