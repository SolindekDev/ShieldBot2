const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client') 

module.exports = {
    name: "ankieta",
    category: "przydatne",
    aliases: ["ankietka", "questionnaire", "form", "inquiry"],
    description: "Tworzy ankiete",
    run: async (client, message, args) => {
        const ankietaContent = args.slice(0).join(" ")

        if (!ankietaContent) {
            sender.error(message.channel, 'Nie podano kontentu ankiety', message)
            return;
        }
        const GoodEmbed = new MessageEmbed()
            .setColor('#002d96')
            .addField('Autor ankiety', message.author.tag)
            .addField('Treść ankiety', ankietaContent)
            .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(GoodEmbed).then(t => {
            t.react('✅')
            t.react('❌')
        })
    }
}
