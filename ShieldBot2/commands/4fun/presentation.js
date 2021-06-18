const { MessageEmbed, MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");
const sender = require('../../utils/senders/message');

module.exports = {
    name: "presentation",
    category: "4fun",
    aliases: ["pn", "prezentacja", "presen"],
    description: "Fajna prezentacja",
    run: async (client, message, args) => {
        const prestext = args.slice(0).join(" ")
        if (!prestext)
        {
            sender.error(message.channel, 'Nie podano tekstu prezentacji', message)
            return
        }
        if (prestext.length > 100)
        {
            sender.error(message.channel, 'Tekst nie może być dłuższy niż 100 znaków', message)
            return
        }
         let img = await new DIG.LisaPresentation().getImage(prestext);
         let attach = new MessageAttachment(img, "putin.png");
         message.channel.send(attach)
                

    }
}