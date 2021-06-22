const { MessageEmbed, MessageAttachment } = require("discord.js");
const db = require("quick.db");
const canvaCord = require('canvacord')
const configClient = require('../../utils/config/client')
const s = require('../../utils/senders/message')

module.exports = {
    name: "warn",
    category: "moderacja",
    aliases: ["w", "ostrzez", "ostrzeż"],
    description: "Ostrzega daną osobę!",
    run: async (client, message, args) => {
        if(!message.member.hasPermission(["KICK_MEMBERS"])) {
            s.error(message.channel, "Nie masz odpowiednich uprawnień! `KICK_MEMBERS`", message)
            return
        }
        
        const warnMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!warnMember) {
            s.error(message.channel, "Nie podano osoby do ostrzeżenia", message)
            return
        }
        
        const reason = args.slice(1).join(" ")
        if(!reason) {
            s.error(message.channel, "Podaj powód", message)
            return
        }
        
        if (warnMember.id === message.author.id) {
            s.error(message.channel, "Nie możesz ostrzeć samego siebie", message)
            return
        }
        
        db.add(`warns_${message.guild.id}_${warnMember.id}`, 1)
        var liczbawarn = db.get(`warns_${message.guild.id}_${warnMember.id}`)
        const embed1 = new MessageEmbed()
            .setAuthor("Zostałeś ostrzeżony")
            .addField(`Serwer`, `${message.guild.name}`, false)
            .addField(`Numer warna`, `${liczbawarn}`, false)
            .addField(`Admin`, `<@${message.author.id}>`, false)
            .addField(`Powód`, `${reason}`, false)
            .setColor('#002d96')
            .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        await warnMember.send(embed1)
        const embed2 = new MessageEmbed()
            .setTitle("Ostrzeżono")
            .addField(`Osoba ostrzeżona`, `<@${warnMember.id}>`, false)
            .addField(`Numer warna`, `${liczbawarn}`, false)
            .addField(`Admin`, `<@${message.author.id}>`, false)
            .addField(`Powód`, `${reason}`, false)
            .setColor('#002d96')
            .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(embed2)
        db.set(`ostatni_warn_reason_${message.guild.id}_${warnMember.id}`, reason)
        db.set(`ostatni_warn_admin_${message.guild.id}_${warnMember.id}`, message.author.tag)
    
    }
}