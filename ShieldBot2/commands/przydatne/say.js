const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const DiscordJS = require('discord.js')
const configClient = require('../../utils/config/client')
const axios = require('axios')

module.exports = {
    name: "say",
    category: "przydatne",
    aliases: ["powiedz", 'sayy'],
    description: "Wysyła wiadomość!",
    run: async (client, message, args) => {
        const ar = args.slice(0).join(' ')

        if (!ar)
        {
            sender.error(message.channel, 'Nie posałeś wiadomości do powiedzenia', message)
        }
        message.delete()
        message.channel.send(ar)
    }
}
