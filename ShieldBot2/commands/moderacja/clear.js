const { MessageEmbed, MessageAttachment, MessageMentions } = require("discord.js");
const db = require("quick.db");
const configClient = require('../../utils/config/client')
const s = require('../../utils/senders/message')

module.exports = {
    name: "clear",
    description: 'Komenda umożliwia wyczyszczenie chatu',
    aliases: ["c", 'wyczysc'],
    category: "Moderacja",
    run: (client, message, args) => {

        if(!message.member.hasPermission(["MANAGE_MESSAGES"])) {
            s.error(message.channel, 'Nie masz wystarczających uprawnień! `MANAGE_MESSAGES`', message)
            return
        }

        if (!args[0]) {
            s.error(message.channel, 'Nie podałeś liczby wiadomości do usunięcia', message)
            return
        }
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            s.error(message.channel, 'Podaj poprawną liczbę', message)
            return
        }
        
        if (!message.guild.me.hasPermission(["MANAGE_MESSAGES"])){
            s.error(message.channel, 'Bot nie posiada wystarczających uprawnień do tej komendy, Nadaj uprawnienie **Zarządzanie Wiadomościami**', message)
            return
        }
            let deleteAmount;

            if (parseInt(args[0]) > 500) {
                deleteAmount = 100;
            } else {
                deleteAmount = parseInt(args[0])
            }
            const GoodEmbed = new MessageEmbed()
                .setTitle('Gotowe')
                .setColor('GREEN')
                .setDescription(`Pomyślnie usunięto ${Math.round(deleteAmount)} wiadomości w tym kanale!
                
                **Ta wiadomość zostanie usunięta za 4 sekundy**`)
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
                message.channel.bulkDelete(Math.round(deleteAmount), true).then(message.channel.send(GoodEmbed).then(msg => {
                    msg.delete({timeout: 4000})
                }))
    }
}