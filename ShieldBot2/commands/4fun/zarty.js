const { MessageEmbed } = require('discord.js');
const axios = require('axios')
const sender = require('../../utils/senders/message')

module.exports = {
    name: "zarty",
    category: "4fun",
    aliases: ["żart", "joke", 'zart'],
    description: "Żart hahahahahahhahah 🤣😂😂🤣🤣😂🤣😂",
    run: async (client, message, args) => {  
        try {
            let url = "https://api.luxbot.ml/zart"
            let image, repsonse;
                response = await axios.get(url)
                image = response.data;
            sender.some(message.channel, image.zart, 'Żart🤣😂😂🤣🤣😂🤣😂', message)
        }
        catch (e) {
            sender.error(message.channel, "Coś poszło nie tak, użyj tej komendy później!", message)
        }

    }
}