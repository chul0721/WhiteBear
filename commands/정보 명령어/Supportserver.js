module.exports = {
    name: "서포트",
    category: "일반 명령어",
    description: "WhiteBear 서포트 서버 링크",
    run: async (client, message, args) => {
        const msg = await message.channel.send('https://discord.gg/yGUkV8V');
    }
}
