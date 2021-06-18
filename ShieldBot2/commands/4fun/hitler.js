const { MessageEmbed, MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");

module.exports = {
    name: "hitler",
    category: "4fun",
    aliases: ["h", "niemcy"],
    description: "Gorszy niż hitler",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
        // Get the avatarUrl of the user
        let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });
         // Make the image
         let img = await new DIG.Hitler().getImage(avatar);
         // Add the image as an attachement
         let attach = new MessageAttachment(img, "hitler.png");
         message.channel.send(attach)
                

    }
}