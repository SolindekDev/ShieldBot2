
const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client') 
const axios = require('axios')

module.exports = {
    name: "binary",
    category: "przydatne",
    aliases: ["zerojedynki", "teksttobinar", "texttobinar"],
    description: "Zmienia tekst w kod binarny!",
    run: async (client, message, args) => {
        if (!args.slice(0).join(" ")){
            sender.error(message.channel, 'Nie podano tekstu do przetłumaczenia!', message)
            return;
        }

        if (args.slice(0).join(" ").length > 100) {
            sender.error(message.channel, 'Tekst jest za długi!', message)
            return;
        }
        try {
            const GoodEmbed = new MessageEmbed()
                .setTitle('Generowanie!')
                .setDescription('Prosimy poczekać chwile')
                .setColor('#002d96')
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(GoodEmbed).then(async (t) => {
                let lyrics, reposnse
                const url = "https://some-random-api.ml/binary?text=" + args.slice(0).join(" ")
                responses = await axios.get(url.replace(/ /g, '%20'))
                lyrics = responses.data 
                const binaryText = lyrics.binary
                const GoodEmbed1 = new MessageEmbed()
                    .addField('Normalny tekst', args.slice(0).join(" "))
                    .addField('Tłumaczenie binarne', binaryText)
                    .setColor('#002d96')
                    .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
                t.edit(GoodEmbed1)
            })
        }
        catch (e) {
            sender.error(message.channel, 'Nie możesz podać polskich znaków!', message)
        }
    }
}
