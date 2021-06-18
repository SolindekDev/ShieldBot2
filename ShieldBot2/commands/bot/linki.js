const sender = require('../../utils/senders/message')
module.exports = {
    name: "linki",
    category: "bot",
    aliases: ["links"],
    description: "Lista linków",
    run: async (client, message, args) => {
        sender.some(message.channel, `[Dodaj Bota](https://discord.com/oauth2/authorize?client_id=831470538480025610&permissions=8&scope=bot)
        [Strona bota](https://shieldbot.gq/)
        [Top.GG](https://top.gg/bot/831470538480025610)
        [Support bota](https://discord.gg/f7EwjaMYZU)`, 'Linki',message)
    }
}
