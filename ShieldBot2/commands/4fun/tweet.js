
const { MessageEmbed, MessageAttachment } = require('discord.js');
const axios = require('axios')
const sender = require('../../utils/senders/message')
const configClient = require('../../utils/config/client')

module.exports = {
    name: "tweet",
    category: "4fun",
    aliases: ["tt", "tw"],
    description: "Tweet generator",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
        const commentTweet = args.slice(0).join(' ')
        
        if (!commentTweet) return sender.error(message.channel, 'Nie podano tweeta', message)
        try {
            const url = `https://nekobot.xyz/api/imagegen?type=tweet&text=${commentTweet}&username=${user.username}`
            let image, response;
            response = await axios.get(url.replace(/ /g, '%20'))
            image = response.data;
                
            const GoodEmbed = new MessageEmbed()
                .setTitle('Tweet')
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
