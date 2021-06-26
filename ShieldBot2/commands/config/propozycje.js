const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client')
const db = require('quick.db');

module.exports = {
    name: "propozycje",
    category: "config",
    aliases: ["setchannelpropozycje", "channelpropozycje", "setpropozycje", "suggestions", "setsuggestions"],
    description: "Ustawiasz kanał propozycji",
    run: async (client, message, args) => {
        const ChannelPropozcyje = message.mentions.channels.first()

        if (!ChannelPropozcyje) {
            sender.error(message.channel, "Nie podano kanału propozycji", message)
            return
        }

        if (!ChannelPropozcyje.guild.me.hasPermission(['SEND_MESSAGES']))
        {
            sender.error(message.channel, "Bot nie posiada uprawnień do pisania na tym kanale!", message)
            return
        }

        db.set(`kanal_propozycji_${message.guild.id}`, ChannelPropozcyje.id)
        sender.succes(message.channel, "Pomyślnie ustawiono kanał propozycji", message)
    }
}
