
const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client') 

module.exports = {
    name: "channelinfo",
    category: "przydatne",
    aliases: ["channel", "informacjekanal", 'kanal'],
    description: "Pokazuje informacje o danym kanale",
    run: async (client, message, args) => {
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel 
        const typechannel = {
            dm: 'PV',
            text: 'Kanał Tekstowy',
            voice: 'Kanał Głosowy',
            news: 'Kanał Ogłoszeń',
            unkown: 'Nie można określić',
        }
        const Embed = new MessageEmbed()
        .setTitle("Informacje na temat " + channel.name)
        .setColor('#002d96')
        .addField('Nazwa Kanału', `<#`+channel.id+`>`)
        .addField('ID Kanału', channel.id)
        .addField('Typ Kanału', typechannel[channel.type])
        .addField('Temat Kanału', channel.topic || "Kanał nie ma tematu")
        .addField('Data stworzenia', channel.createdAt.toLocaleDateString("pl-eu"))
        .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(Embed);
    }
}
