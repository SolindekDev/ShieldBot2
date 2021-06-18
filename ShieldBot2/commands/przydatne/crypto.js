
const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client') 
const axios = require('axios');
const lyrics = require('../4fun/lyrics');

module.exports = {
    name: "crypto",
    category: "przydatne",
    aliases: ["crp"],
    description: "Pokazuje kurs cryptowalut",
    run: async (client, message, args) => {
        if (args[0]) {
            const bitcoin = args[0].toLowerCase()
                let lyrics, responses
                const url = "https://api.coinranking.com/v1/public/coins"
                responses = await axios.get(url)
                lyrics = responses.data 
            if (bitcoin == "btc" || bitcoin == "bitcoin")
            {
                //console.log(lyrics.data.coins[0])
                const GoodEmbed = new MessageEmbed()
                    .setTitle('Kurs ' + lyrics.data.coins[0].symbol)
                    .setColor(lyrics.data.coins[0].color)
                    .setDescription(`[Strona internetowa](${lyrics.data.coins[0].websiteUrl})`)
                    .addField('Aktualny koszt', lyrics.data.coins[0].price + '$')
                    .addField('Zmiana', lyrics.data.coins[0].change + "$")
                    .addField('Największy koszt kiedykolwiek', lyrics.data.coins[0].allTimeHigh.price + '$')
                    .setThumbnail('https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/1024/Bitcoin-BTC-icon.png')
                    .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
                message.channel.send(GoodEmbed)
                return;
            }
            if (bitcoin == "etherum" || bitcoin == "eth")
            {
                //console.log(lyrics.data.coins[1])
                const GoodEmbed = new MessageEmbed()
                    .setTitle('Kurs ' + lyrics.data.coins[1].symbol)
                    .setColor('#7a7a7a')
                    .setDescription(`[Strona internetowa](${lyrics.data.coins[1].websiteUrl})`)
                    .addField('Aktualny koszt', lyrics.data.coins[1].price + '$')
                    .addField('Zmiana', lyrics.data.coins[1].change + "$")
                    .addField('Największy koszt kiedykolwiek', lyrics.data.coins[1].allTimeHigh.price + '$')
                    .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ethereum-icon-purple.svg/1200px-Ethereum-icon-purple.svg.png')
                    .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
                message.channel.send(GoodEmbed)
                return;
            }
            if (bitcoin == "usdt" || bitcoin == 'tether')
            {
                console.log(lyrics.data.coins[3])
                const GoodEmbed = new MessageEmbed()
                    .setTitle('Kurs ' + lyrics.data.coins[2].symbol)
                    .setColor(lyrics.data.coins[2].color)
                    .setDescription(`[Strona internetowa](${lyrics.data.coins[2].websiteUrl})`)
                    .addField('Aktualny koszt', lyrics.data.coins[2].price + '$')
                    .addField('Zmiana', lyrics.data.coins[2].change + "$")
                    .addField('Największy koszt kiedykolwiek', lyrics.data.coins[2].allTimeHigh.price + '$')
                    .setThumbnail('https://bitbay.net/helpdesk/bitcoin-cryptocurrencies/tether-usdt/USDT_.png')
                    .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
                message.channel.send(GoodEmbed)
                return;
            }
            if (bitcoin == "bnb" || bitcoin == 'binance')
            {
                //console.log(lyrics.data.coins[3])
                const GoodEmbed = new MessageEmbed()
                    .setTitle('Kurs ' + lyrics.data.coins[3].symbol)
                    .setColor(lyrics.data.coins[3].color)
                    .setDescription(`[Strona internetowa](${lyrics.data.coins[3].websiteUrl})`)
                    .addField('Aktualny koszt', lyrics.data.coins[3].price + '$')
                    .addField('Zmiana', lyrics.data.coins[32].change + "$")
                    .addField('Największy koszt kiedykolwiek', lyrics.data.coins[3].allTimeHigh.price + '$')
                    .setThumbnail('https://cryptologos.cc/logos/binance-coin-bnb-logo.png')
                    .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
                message.channel.send(GoodEmbed)
                return;
            }
        }
        sender.error(message.channel, 'Nie podano nazwy crypto waluty `bnb`,`usdt`,`eth`,`btc`', message)
    }
}
