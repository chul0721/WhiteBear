const configDATA = require('./config.json');
const whitebearconfig = require('./whitebear-ogcc-30a9458d1f03.json')
const Discord = require('discord.js');
const client = new Discord.Client();
const dialogflow = require('dialogflow')
client.on('ready', () => {
  console.log("로그인 되었습니다.");
  setInterval(() => {
      switch (Math.floor(Math.random() * 3)) {
          case 0:
              client.user.setPresence({
                  status: 'online',
                  activity: {
                      name: `화베에게 DM으로 말을 걸면 접두사 없이 대화가 가능합니다!`,
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
                      name: `화베야 [말] 을 쓰면 화베와 다양한 말을 할 수 있어요!`,
                      type: 'PLAYING'
                  }
              });
              break;
      }
  }, 10000);
});

client.on('message', async message => {
  if((message.cleanContent.startsWith(configDATA.prefix) || message.channel.type == 'dm') && client.user.id != message.author.id){
    var mess = remove(client.user.username, message.cleanContent);
    const user = message.author.id;
    const privateKey = whitebearconfig.private_key.replace(/\\n/g, '\n');
    const clientEmail = whitebearconfig.client_email
    let config = {
      credentials: {
        private_key: privateKey,
        client_email: clientEmail
      }
    }
    const sessionClient = new dialogflow.SessionsClient(config)
    const sessionPath = sessionClient.sessionPath(configDATA.project_id , user)
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: mess,
          languageCode: "ko-KR",
        }
      }
    };
    const response = await sessionClient.detectIntent(request);
    const rep = response[0].queryResult.fulfillmentText  //Default response
    message.reply(rep)
  }
});
function remove(username, text) {
  return text.replace('@' + username + ' ', '');
};
client.login(configDATA.token)