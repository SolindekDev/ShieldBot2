const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client') 
const db = require('quick.db')

module.exports = {
    name: "ungban",
    category: "dev",
    aliases: ["ugb", "unbotban", "unuserban"],
    description: "UnBanuje osobę na używanie bota",
    run: async (client, message, args) => {
        if (message.author.id == "644446151210172447" || message.author.id == "572677844023640084")
        {
            if (!args[0])
            {
                sender.error(message.channel, 'Nie podałeś id osoby do ungbana', message)
                return
            }
            if (db.get(`gban_${args[0]}`) == "false")
            {
                sender.error(message.channel, 'Podana osoba nie posiada gbana', message)
                return
            }
            db.set(`gban_${args[0]}`, 'false')
            const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor("Sukces")
                .addField(`UnGban dla`, `${args[0]}`, false)
            message.channel.send(embed2)

        }
        else {
            sender.error(message.channel, 'Nie jesteś właścicielem bota!', message)
            return
        }



    }
}