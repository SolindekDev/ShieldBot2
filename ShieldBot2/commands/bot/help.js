const sender = require('../../utils/senders/message')

module.exports = {
    name: "help",
    category: "bot",
    aliases: ["pomoc", "helpme", "pomoć"],
    description: "Lista pomocy bota",
    run: async (client, message, args) => {
        sender.some(message.channel, 'Test aliasów', 'Test', message)
    }
}
