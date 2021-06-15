const sender = require('../../utils/senders/message')

module.exports = {
    name: "ping",
    category: "bot",
    aliases: ["opoznienie", "myping", "latency"],
    description: "Lista pomocy bota",
    run: async (client, message, args) => {
        sender.some(message.channel, `Ping ShieldBota wynosi: **${Date.now() - message.createdTimestamp}ms.**

        > Jeżeli ping przekracza 300ms niezwłocznie powiadom\n> administracje komendą zglos`, `Ping bota`, message)
    }
}
