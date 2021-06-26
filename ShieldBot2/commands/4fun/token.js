const { MessageEmbed, MessageAttachment } = require('discord.js');
const sender = require('../../utils/senders/message')
const configClient = require('../../utils/config/client')
const axios = require('axios')

module.exports = {
    name: "token",
    category: "4fun",
    aliases: ["tokenbota", "tbot"],
    description: "Token bota ✨",
    run: async (client, message, args) => {
        message.channel.send('Ze względów bezpieczeństwa sprawdź pv')
        let url = "https://some-random-api.ml/bottoken"
        let image, repsonse;
            response = await axios.get(url)
            image = response.data;
        message.author.send("Token ShieldBOT'a \n\n ||" +image.token+"||")
    }
}