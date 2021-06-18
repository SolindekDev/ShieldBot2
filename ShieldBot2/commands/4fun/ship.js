
const { MessageEmbed, MessageAttachment, User } = require('discord.js');
const DIG = require("discord-image-generation");
const axios = require('axios')
const sender = require('../../utils/senders/message')
const configClient = require('../../utils/config/client')

module.exports = {
    name: "ship",
    category: "4fun",
    aliases: ["shiped", "procentyzakochania"],
    description: "Ship z kimś",
    run: async (client, message, args) => {
        let osoba2 = args[1] || message.author.username
        if (!args[0])
        {
            sender.error(message.channel ,'Napisz pierwszą osobę', message)
            return;
        }
        const procentyship = Math.floor(Math.random() * 99) + 1;
        if (procentyship < 50) {
            const GoodEmbed = new MessageEmbed()
                .setColor("#c714db")
                .setAuthor("💕 Ship")
                .setImage('https://psychoterapiacotam.pl/wp-content/uploads/2018/01/Samotność-przyczyny-skutki-objawy-i-leczenie-samotności.jpg')
                .setDescription(`Miłość między **${args[0]}** a **${osoba2}** wynosi **${procentyship}%**`)
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(GoodEmbed)
        } else {
            const GoodEmbed = new MessageEmbed()
                .setColor("#c714db")
                .setAuthor("💕 Ship")
                .setImage('https://avigon.pl/sites/default/files/czym-jest-milosc_0.jpg')
                .setDescription(`Miłość między **${args[0]}** a **${osoba2}** wynosi **${procentyship}%**`)
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(GoodEmbed)
        }

    }
}