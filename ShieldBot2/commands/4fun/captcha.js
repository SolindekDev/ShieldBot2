const { MessageEmbed, MessageAttachment } = require('discord.js');
const balll = require('8ball-pl')
const sender = require('../../utils/senders/message')
const configClient = require('../../utils/config/client')

module.exports = {
    name: "8ball",
    category: "4fun",
    aliases: ["8b", "pytanie"],
    description: "Pytasz o coś bota",
    run: async (client, message, args) => {
        const ball = args.slice(0).join(" ")
        
        if (!ball) return sender.error(message.channel, 'Napisz pytanie', message)
        const GoodEmbed = new MessageEmbed()
            .setColor('#002d96')
            .addField('Twoje pytanie', ball)
            .addField('Odpowiedź', balll.pl())
            .setFooter( 'Powered By 8Ball-PL NPM  |  ' + configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(GoodEmbed)
    }
}