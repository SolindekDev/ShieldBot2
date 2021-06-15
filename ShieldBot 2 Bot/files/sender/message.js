const { MessageEmbed } = require('discord.js');
const config = require('../config/client')

module.exports = {
    error: function(msg, errormessage) {
        const Embed = new MessageEmbed()
        .setAuthor("Coś poszło nie tak!", `https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/red-x.png`)
        .setColor("#ff5e87")
        .setDescription(errormessage)
        .setFooter(config.footer , msg.author.displayAvatarURL({dynamic: true}))
        return msg.inlineReply(Embed);
    }
}