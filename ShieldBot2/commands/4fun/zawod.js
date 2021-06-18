const { MessageEmbed, MessageAttachment, User } = require('discord.js');
const DIG = require("discord-image-generation");
const axios = require('axios')
const sender = require('../../utils/senders/message')

module.exports = {
    name: "zawod",
    category: "4fun",
    aliases: ["zawodzik", "profession"],
    description: "Kim będziesz?",
    run: async (client, message, args) => {
        try {
            let url = "https://api.luxbot.ml/randomize?plik=https://pastebin.com/raw/KnRYreBh"

            let image, repsonse;
            response = await axios.get(url)
            image = response.data;
            sender.some(message.channel, `W przyszłości **${image.random}**`, 'Zawód', message)
        }
        catch (e) {
            sender.error(message.channel, "Coś poszło nie tak, użyj tej komendy później!", message)
        }
    }
}