const { MessageEmbed, MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: "ad",
    category: "4fun",
    aliases: ["add", "reklama"],
    description: "Ale piękna reklama",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
         // Get the avatarUrl of the user
         let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
         // Make the image
         let img = await new DIG.Ad().getImage(avatar);
         // Add the image as an attachement
         let attach = new MessageAttachment(img, "beafuti.png");
         message.channel.send(attach)
                

    }
}