const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client')
const db = require('quick.db');
const { text } = require('figlet');

module.exports = {
    name: "antybot",
    category: "config",
    aliases: ["ab", "antyb"],
    description: "Ustawiasz antybota",
    run: async (client, message, args) => {
        let typeAntyBot = args[0]
        let onOff = args[1]

        if(!message.member.hasPermission(["KICK_MEMBERS"])) {
            sender.error(message.channel, "Nie posiadasz odpowiednich uprawnień! `KICK_MEMBERS`")
            return
        }

        if (typeAntyBot)
        {
            if (typeAntyBot == 'link')
            {
                if (!onOff)
                {
                    sender.error(message.channel, `Podaj argument on/off`, message)
                    return
                }
                if (onOff == 'on')
                {
                    db.set(`antybot_link_${message.guild.id}`, 'true')
                    sender.succes(message.channel, 'Włączono AntyLink!', message)
                    return
                }
                if (onOff == 'off')
                {
                    db.set(`antybot_link_${message.guild.id}`, 'false')
                    sender.succes(message.channel, 'Wyłączono AntyLink!', message)
                    return
                }
                else {
                    sender.error(message.channel, `Podaj argument on/off`, message)
                    return
                }

            }

            if (typeAntyBot == 'invite')
            {
                if (!onOff)
                {
                    sender.error(message.channel, `Podaj argument on/off`, message)
                    return
                }
                if (onOff == 'on')
                {
                    db.set(`antybot_invite_${message.guild.id}`, 'true')
                    sender.succes(message.channel, 'Włączono AntyInvite!', message)
                    return
                }
                if (onOff == 'off')
                {
                    db.set(`antybot_invite_${message.guild.id}`, 'false')
                    sender.succes(message.channel, 'Wyłączono AntyInvite!', message)
                    return
                }
                else {
                    sender.error(message.channel, `Podaj argument on/off`, message)
                    return
                }

            }
            sender.error(message.channel, `Nie podano odpowiednich argumentów
            
            \`s!antybot invite/link on/off\``, message)
            return
        }
        else {
            sender.error(message.channel, `Nie podano odpowiednich argumentów
            
            \`s!antybot invite/link on/off\``, message)
            return
        }

    }
}
