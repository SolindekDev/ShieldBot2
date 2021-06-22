const { MessageEmbed, MessageAttachment } = require('discord.js');
const DIG = require("discord-image-generation");
const sender = require('../../utils/senders/message');

module.exports = {
    name: "pukpuk",
    category: "4fun",
    aliases: ["puk", "drzwi"],
    description: "Puk puk! Kto tam?",
    run: async (client, message, args) => {
        message.channel.send('Kto tam?')
    }
}