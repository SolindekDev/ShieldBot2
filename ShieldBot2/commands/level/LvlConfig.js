const db = require("quick.db")
const s = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "lvl-config",
    description: "Włączasz/Wyłączasz/Ustawiasz kanał leveli/le",
    aliases: ["level-config"],
    run: async (client, message, args) => {

        if (!message.member.hasPermission("MANAGE_GUILD")) return s.error(message.channel, 'Nie masz odpowiednich uprawnień do tej komendy `MANAGE_GUILD`', message)

        if (!args[0]) return s.error(message.channel, 'Musisz podać typ konfiguracji leveli! `s!lvl-config <wlacz, wylacz, kanal>`', message)

        if (args[0] === "kanal") {

            const kanal = 
            message.guild.channels.cache.get(args[1]) ||
            message.guild.channels.cache.find(x => x.name === args.join("2")) ||
            message.mentions.channels.first();
    
            if (!kanal) return s.error(message.channel, 'Aby ustawić kanał musisz go oznaczyć', message)
            if (!message.guild.channels.cache.get(kanal.id)) return s.error(message.channel, 'Aby ustawić kanał musisz go oznaczyć', message)
        
            if (kanal.type !== "text") return s.error(message.channel, 'Oznaczony kanał nie jest kanałem tekstowym', message)
    
            db.set(`lvl_k_${message.guild.id}`, kanal.id)
            db.get(`ilvl_${message.guild.id}`, "true")
            s.succes(message.channel, 'Kanał leveli został ustawiony pomyślnie', message)
        } 

        if (args[0] === "wylacz") {
            db.delete(`lvl_k_${message.guild.id}`)
            db.delete(`expp_${message.guild.id}`)
            s.succes(message.channel, 'System leveli został pomyślnie wyłączony', message)
        }

        if (args[0] === "wlacz") {
            db.set(`lvl_k_${message.guild.id}`, "true")
            s.succes(message.channel, 'System leveli został pomyślnie włączony', message)
        }

    }
}