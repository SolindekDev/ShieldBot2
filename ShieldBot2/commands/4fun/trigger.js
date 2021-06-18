const { MessageEmbed, MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: "trigger",
    category: "4fun",
    aliases: ["triggered", "wkurzony", "wkurzon"],
    description: "Fajna prezentacja",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
        // Get the avatarUrl of the user
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'gif' });
         // Make the image
         let img = await new DIG.Triggered().getImage(avatar);
         // Add the image as an attachement
         let attach = new MessageAttachment(img, "delete.gif");
         message.channel.send(attach)
                

    }
}