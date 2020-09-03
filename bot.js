const { Client, MessageAttachment } = require('discord.js');
const Discord = require('discord.js');
const client = new Client();
const config = require('./config');

client.on('ready', () => {
  console.log(`${client.user.tag}으로 접속을 완료하였습니다.`);
  client.user.setActivity('화베야 도움', { type: 'WATCHING' })
});

client.on('message', msg => {
  if (msg.content === `${config.prefix} ping`) {
    msg.channel.send(client.ping + ' ms,Pong!');
  }
});

client.on('message', msg => {
    if (msg.content == `${config.prefix} 누구니`) {
        msg.channel.send(`전 ${client.user.tag}에요.`);
    }
});

client.on('message', msg => {
  if (msg.content.startsWith(`${config.prefix} 안녕`)) {
      msg.reply(`안녕하세요~ :)`);
  }
});

client.on('message', msg => {
  if (msg.content == `${config.prefix}`) {
      msg.channel.send(`저를 부르셨나요?`);
  }
});

client.on('message', msg => {
    if (msg.content == `${config.prefix} 초대`) {
        msg.reply('https://discord.com/api/oauth2/authorize?client_id=744793044678737961&permissions=8&scope=bot');
    }
});

client.on('message', msg => {
    if (msg.content === `${config.prefix} 짤`) {
      const attachment = new MessageAttachment('https://i.imgur.com/KbmXcTq.png');
      msg.channel.send(attachment);
    }
});

client.on('message', msg => {
  if (msg.content === `${config.prefix} 개발자`) {
    msg.reply('int:tm: 에서 개발되었어요.');
  }
});
client.on('message', msg => {
  if (msg.content === `${config.prefix} 도움`) {
    const help = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle('화베야 도움')
    .setAuthor('WhiteBear')
    .setDescription('WhiteBear의 도움말이에요.')
    .addFields(
      { name: '도움', value: 'WhiteBear의 사용법을 알려드려요.' },
      { name: '\u200B', value: '\u200B' },
      { name: '짤', value: '랜덤한 짤을 보내요.', inline: true },
      { name: '초대', value: '초대 링크를 보내요.', inline: true },
    )
    .setTimestamp()
    .setFooter('2020 int ©. All Rights Reserved.');

    msg.channel.send(help);
    msg.reply('```더 정확한 사항을 알고 싶다면?``` \n `공식 서포트 서버 :` https://discord.gg/WxjQaPK')
  }
});

client.login(config.token);