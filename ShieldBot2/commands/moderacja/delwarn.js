const { MessageEmbed, MessageAttachment } = require("discord.js");
const db = require("quick.db");
const configClient = require('../../utils/config/client')
const s = require('../../utils/senders/message')

module.exports = {
    name: "delwarn",
    category: "moderacja",
    aliases: ["dw", "del-warn", "usunostrzezenie", "usuńostrzeżnia", "usunwarny"],
    description: "Sprawdza ilość warnów u danej osoby!",
    run: async (client, message, args) => {

        if(!message.member.hasPermission(["KICK_MEMBERS"])) {
            s.error(message.channel, "Nie masz odpowiednich uprawnień! `KICK_MEMBERS`", message)
            return
        }

        const warnMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!warnMember) {
            s.error(message.channel, "Nie podano osoby", message)
            return
        }
        let delwarnliczba = args[1]
        if(isNaN(delwarnliczba)) {
            s.error(message.channel, "Podaj właściwą liczbę usunięć", message)
            returnS
        }
        if(!warnMember) {
            s.error(message.channel, "Nie podano osoby", message)
            return
        }
        var warny = db.get(`warns_${message.guild.id}_${warnMember.id}`)
        if (args[1]>warny)
        {
            s.error(message.channel, "Oznaczony użytkownik nie posiada aż tyle warnów! Podaj mniejszą liczbę albo sprawdź komendą s!warns", message)
            return
        }
        db.set(`warns_${message.guild.id}_${warnMember.id}`, warny - args[1])
        var liczbawarn = db.get(`warns_${message.guild.id}_${warnMember.id}`)
        const embed2 = new MessageEmbed()
        .setTitle(`Usunięto ${args[1]} warny`)
        .addField(`Osoba`, `<@${warnMember.id}>`, false)
        .addField(`Usunięte warny`, `${args[1]}`, false)
        .setColor('#002d96')
        .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embed2)
    }
}