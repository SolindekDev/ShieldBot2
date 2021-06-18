const sender = require('../../utils/senders/message')
module.exports = {
    name: "invite",
    category: "bot",
    aliases: ["zapros", "dodajbota", "dodaj"],
    description: "Zaproś bota",
    run: async (client, message, args) => {
            sender.some(message.channel, `Jest nam niezmiernie miło że chcesz dodać naszego bota na swój serwer 
            
            [Kliknij!](https://discord.com/oauth2/authorize?client_id=831470538480025610&permissions=8&scope=bot)`, 'Zaproś bota', message)
    }
}
