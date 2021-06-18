const { MessageEmbed, MessageAttachment } = require('discord.js');
const axios = require('axios')
const sender = require('../../utils/senders/message')
const configClient = require('../../utils/config/client')

module.exports = {
    name: "pornhubcomment",
    category: "4fun",
    aliases: ["pc", "pornhubc" ,"pcomment"],
    description: "Youtube comment generator",
    run: async (client, message, args) => {
        if (!args.slice(0).join(' ')) return sender.error(message.channel, 'Nie podano treści komentarza', message)
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
        try {
            
            const GoodEmbed = new MessageEmbed()
                .setTitle('(¬‿¬)')
                .setColor('#002d96')
                .setImage(`https://nekobot.xyz/api/imagegen?type=phcomment&text=`+ args.slice(0).join(' ') +`&image=` + user.displayAvatarURL({dynamic: true}) + `&username=` + user.username + `&raw=1`.replace(/ /g, '%20'))
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(GoodEmbed)
        }
        catch (e) {
            sender.error(message.channel, 'API nie odpowiada kod 404 ', message)
            return
        }
    }
}