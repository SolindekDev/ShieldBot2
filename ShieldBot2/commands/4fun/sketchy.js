const { MessageEmbed, MessageAttachment } = require('discord.js');
const sender = require('../../utils/senders/message')
const configClient = require('../../utils/config/client')

module.exports = {
    name: "sketchy",
    category: "4fun",
    aliases: ["szkic", "szkice"],
    description: "ALE ARTYSTA!!1!1!!1",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
        const GoodEmbed = new MessageEmbed()
            .setTitle("ALE ARTYSTA!!1!1!!1")
            .setColor('#002d96')
            .setImage(`https://api.luxbot.ml/sketchy?image=${user.displayAvatarURL({dynamic: true})}`)
            .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(GoodEmbed)
    }
}