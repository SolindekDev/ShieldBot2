const { MessageEmbed, MessageAttachment } = require("discord.js");
const db = require("quick.db");
const configClient = require('../../utils/config/client')
const s = require('../../utils/senders/message')

module.exports = {
    name: "slowmode",
    category: "moderacja",
    aliases: ["s", "slow", "slowm"],
    description: "Ustawia slowmode na kanale",
    run: async (client, message, args) => {
        let thisChannel = message.mentions.channels.first() || message.channel
        if(!message.member.hasPermission(["MANAGE_MESSAGES"])) {
            s.error(message.channel, 'Nie posiadasz wymaganych uprawnień do tej komendy `MANAGE_MESSAGE`', message)
            return;
        }

        if(!args[0]) {
            s.error(message.channel, 'Nie podałeś czasu', message)
            return;
        }

        if(isNaN(args[0])) {
            s.error(message.channel, 'Podaj właściwą liczbę', message)
            return;
        }

        if (args[0].length > 21600)
        {
            s.error(message.channel, 'Maksymalną liczbą jest 21600', message)
            return;
        }

        thisChannel.setRateLimitPerUser(Math.round(args[0])) 
        if (args[0] == 0)
        {
            const GoodEmbed = new MessageEmbed()
                .setTitle('Gotowe')
                .setColor('GREEN')
                .setDescription(`Pomyślnie wyłączono cooldown!`)
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(GoodEmbed)
        }
        else {
            const GoodEmbed = new MessageEmbed()
                .setTitle('Gotowe')
                .setColor('GREEN')
                .setDescription(`Pomyślnie ustawiono cooldown na ${Math.round(args[0])} sekund!`)
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(GoodEmbed)
        }
    }
}