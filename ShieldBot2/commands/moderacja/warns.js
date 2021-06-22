const { MessageEmbed, MessageAttachment } = require("discord.js");
const db = require("quick.db");
const configClient = require('../../utils/config/client')
const s = require('../../utils/senders/message')

module.exports = {
    name: "warns",
    category: "moderacja",
    aliases: ["ws", "ostrzezenia", "ostrzeżnia", "sprawdzwarny"],
    description: "Sprawdza ilość warnów u danej osoby!",
    run: async (client, message, args) => {

        if(!message.member.hasPermission(["KICK_MEMBERS"])) {
            s.error(message.channel, "Nie masz odpowiednich uprawnień! `KICK_MEMBERS`", message)
            return
        }

        let warnMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.author
        if(!warnMember) {
            s.error(message.channel, "Nie podano osoby do sprawdzenia ostrzeżeń", message)
            return
        }
        if(!warnMember) {
            s.error(message.channel, "Nie podano osoby do sprawdzenia ostrzeżeń", message)
            return
        }
        const liczbawarn = db.get(`warns_${message.guild.id}_${warnMember.id}`) || 0
        const resonOstatni = db.get(`ostatni_warn_reason_${message.guild.id}_${warnMember.id}`) || 'Nie znaleziono'
        const adminOstatni = db.get(`ostatni_warn_admin_${message.guild.id}_${warnMember.id}`) || 'Nie znaleziono'
        const embed2 = new MessageEmbed()
        .setColor('#002d96')
        .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        .setTitle("Liczba ")
        .addField(`Osoba`, `<@${warnMember.id}>`, false)
        .addField(`Liczba Ostrzeżeń`, `${liczbawarn}`, false)
        .addField(`Ostatni warn`, `Powód: **${resonOstatni}**
        Admin: **${adminOstatni}**`)
        message.channel.send(embed2)
    }
}