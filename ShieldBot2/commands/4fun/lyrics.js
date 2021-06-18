const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const DiscordJS = require('discord.js')
const configClient = require('../../utils/config/client')
const axios = require('axios')

module.exports = {
    name: "lyrics",
    category: "4fun",
    aliases: ["piosenka"],
    description: "Znajduje podany tekst w jakiej kolwiek piosence",
    run: async (client, message, args) => {
        if (!args.slice(0).join(" ")) {
            sender.error(message.channel, 'Nie podano tekstu do znalezienia!', message)
            return;
        }

        try {
            let lyrics, reposnse
            const url = "https://some-random-api.ml/lyrics?title=" + args.slice(0).join(" ")
            responses = await axios.get(url.replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20').replace(' ', '%20'))
            lyrics = responses.data 
            let tekstLyrics = lyrics.lyrics
            message.channel.send(tekstLyrics).catch((e) => {
                sender.error(message.channel, 'Tekst jest za długi! Znajdź inny tekst', message)
                return;
            })
        }
        catch (e) {
            sender.error(message.channel, 'Nie znaleziono podanego kawałka tekstu\n\n\ ``' + e + '``', message)
            return;
        }
    }
}
