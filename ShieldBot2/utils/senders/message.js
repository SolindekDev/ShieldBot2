const { MessageEmbed } = require("discord.js");
const configCommand = require('../config/commands') 
const configClient = require('../config/client') 

module.exports = {
    succes: function(messageChannelSend, messageContent, messageVariable) {
        const GoodEmbed = new MessageEmbed()
            .setTitle('Gotowe')
            .setColor('GREEN')
            .setDescription(messageContent)
            .setFooter(configClient.footer, messageVariable.author.displayAvatarURL({dynamic: true}))
        messageChannelSend.send(GoodEmbed)
    },
    error: function(messageChannelSend, messageContent, messageVariable) {
        const GoodEmbed = new MessageEmbed()
            .setTitle('Coś poszło nie tak!')
            .setColor('RED')
            .setDescription(messageContent)
            .setFooter(configClient.footer, messageVariable.author.displayAvatarURL({dynamic: true}))
        messageChannelSend.send(GoodEmbed)
    },
    warning: function(messageChannelSend, messageContent, messageVariable) {
        const GoodEmbed = new MessageEmbed()
            .setTitle('Uwaga!')
            .setColor('RED')
            .setDescription(messageContent)
            .setFooter(configClient.footer, messageVariable.author.displayAvatarURL({dynamic: true}))
        messageChannelSend.send(GoodEmbed)
    },
    some: function(messageChannelSend, messageContent, messageTitle, messageVariable) {
        const GoodEmbed = new MessageEmbed()
            .setTitle(messageTitle)
            .setColor('#002d96')
            .setDescription(messageContent)
            .setFooter(configClient.footer, messageVariable.author.displayAvatarURL({dynamic: true}))
        messageChannelSend.send(GoodEmbed)
    }
}