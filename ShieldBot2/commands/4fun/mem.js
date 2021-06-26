const { MessageEmbed } = require('discord.js');
const axios = require('axios')
const sender = require('../../utils/senders/message')
const configClient = require('../../utils/config/client')


module.exports = {
    name: "mem",
    category: "4fun",
    aliases: ["memy", 'memik'],
    description: "Bardzo śmieszny mem",
    run: async (client, message, args) => {  
        try {
            let url = "https://api.luxbot.ml/memy"
            let image, repsonse;
                response = await axios.get(url)
                image = response.data;
            const GoodEmbed = new MessageEmbed()
                .setTitle('Bardzo śmieszny mem')
                .setColor('#002d96')
                .setImage(image.mem)
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(GoodEmbed)
        }
        catch (e) {
            console.log(e)
            sender.error(message.channel, "Coś poszło nie tak, użyj tej komendy później!", message)
        }

    }
}