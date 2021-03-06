const { MessageEmbed, MessageAttachment } = require('discord.js');
const axios = require('axios')
const sender = require('../../utils/senders/message')
const configClient = require('../../utils/config/client')

module.exports = {
    name: "captcha",
    category: "4fun",
    aliases: ["ca", "c"],
    description: "Captcha generator",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
        try {
            const url = `https://nekobot.xyz/api/imagegen?type=captcha&url=` + user.displayAvatarURL({dynamic: true}) + `&username=` + user.username
            let image, response;
            response = await axios.get(url.replace(/ /g, '%20'))
            image = response.data;
                
            const GoodEmbed = new MessageEmbed()
                .setTitle('Captcha')
                .setColor('#002d96')
                .setImage(image.message)
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(GoodEmbed)
        }
        catch (e) {
            sender.error(message.channel, 'API nie odpowiada kod 404 ', message)
            return
        }
    }
}