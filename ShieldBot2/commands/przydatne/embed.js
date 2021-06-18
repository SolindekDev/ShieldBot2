
const sender = require('../../utils/senders/message')
const { MessageEmbed, Discord } = require("discord.js");
const configClient = require('../../utils/config/client') 

module.exports = {
    name: "embed",
    category: "przydatne",
    aliases: ["stworzembed", "createembed"],
    description: "Tworzy własną wiadmość embed",
    run: async (client, message, args) => {
        sender.warning(message.channel, 'Komenda w czasie prac', message)
        // const argsEmbed = args.slice("||").join(' ')
        // message.channel.send(argsEmbed[0])
    }
}
