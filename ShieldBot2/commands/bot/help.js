const sender = require('../../utils/senders/message')

module.exports = {
    name: "help",
    category: "bot",
    aliases: ["pomoc", "helpme", "pomoć"],
    description: "Returns latency and API ping",
    run: async (client, message, args) => {
        sender.some(message.channel, 'Test aliasów', 'Test', message)
    }
}
