
const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client') 

module.exports = {
    name: "userinfo",
    category: "przydatne",
    aliases: ["uzytkownikinfo", "informacjeuser", 'user'],
    description: "Pokazuje informacje o danej osobie",
    run: async (client, message, args) => {
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author

        const statuss = {
            online: 'Aktywny',
            dnd: 'Nie przeszkadzać',
            idle: 'Zaraz wracam',
            offline: 'Niedostępny'
        }
        const bot = {
            true: 'Użytkownik jest botem',
            false: 'Użytkownik nie jest botem'
        }
        const Embed = new MessageEmbed()
        .setTitle("Informacje o " + user.username)
        .setColor('#002d96')
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .addField('Nazwa Użytkownika', user.username)
        .addField('Hasztag', `#${user.discriminator}`)
        .addField('ID Użytkownika', user.id)
        .addField('Status Użytkownika', statuss[user.presence.status])
        .addField('Ostatnia wiadomość', user.lastMessage || "Nie znaleziono")
        .addField('Ostatnia wiadomośća ID', user.lastMessageID || "Nie znaleziono")
        .addField('Czy jest botem', bot[user.bot])
        .addField('Konto stworzono', user.createdAt.toLocaleDateString("pl-eu"))
        .addField('Avatar Użytkownika', `[GIF](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.gif) | [PNG](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png) | [JPG](https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.jpg)`)
        .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(Embed);
    }
}
