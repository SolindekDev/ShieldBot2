const { MessageEmbed, MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: "notstonks",
    category: "4fun",
    aliases: ["ns", "nots", "nstonks"],
    description: "Brak profitu",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
         let img = await new DIG.NotStonk().getImage(avatar);
         let attach = new MessageAttachment(img, "putin.png");
         message.channel.send(attach)
                

    }
}