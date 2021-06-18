const { MessageEmbed, MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: "malowanie",
    category: "4fun",
    aliases: ["malo", "m", "paint", "painting"],
    description: "Face Palm",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
        // Get the avatarUrl of the user
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
         // Make the image
         let img = await new DIG.Bobross().getImage(avatar);
         // Add the image as an attachement
         let attach = new MessageAttachment(img, "hitler.png");
         message.channel.send(attach)
                

    }
}