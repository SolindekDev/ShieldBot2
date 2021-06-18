const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client') 

module.exports = {
    name: "avatar",
    category: "przydatne",
    aliases: ["profilowe", "profil", "imageavatar"],
    description: "Pokazuje avatar podanej osoby",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
        const Embed = new MessageEmbed()
        .setTitle('Avatar')
        .setColor('#002d96')
        .setImage(user.displayAvatarURL({dynamic: true, size: 4096}))
        .setDescription(`[GIF](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif?size=4096) | [PNG](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=4096) | [JPG](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg?size=4096)`)
        .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(Embed);
    }
}
