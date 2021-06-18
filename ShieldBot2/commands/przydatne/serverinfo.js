
const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client') 

module.exports = {
    name: "serverinfo",
    category: "przydatne",
    aliases: ["serwerinfo", "informacjeserwer", 'serwer'],
    description: "Pokazuje informacje o danym serwerze",
    run: async (client, message, args) => {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString())
        const channels = message.guild.channels.cache.sort((a, b) => b.position - a.position).map(role => role.toString())

        const regions = {
            brazil: ':flag_br:  Brazylia',
            europe: ':flag_eu:  Europa',
            hongkong: ':flag_hk:  Hong Kong',
            india: ':flag_in:  Indie',
            japan: ':flag_jp:  Japonia',
            russia: ':flag_ru:  Rosja',
            singapore: ':flag_sg:  Singapur',
            southafrica: ':flag_za:  Południowa Afryka',
            sydney: ':flag_sh:  Sydney',
        };
        
        const ver = {
            NONE: 'Nie posiada',
            LOW: 'Niski',
            MEDIUM: 'Średni',
            HIGH: 'Wysoki'
        }

        const avatarServer = message.guild.iconURL({dynamic: true})
        const Embed = new MessageEmbed()
        .setTitle("Informacje na temat " + message.guild.name)
        .setColor('#002d96')
        .setThumbnail(avatarServer)
        .addField('Nazwa Serwera', message.guild.name)
        .addField('ID Serwera', message.guild.id)
        .addField('Właściciel', `<@`+message.guild.owner.user.id+`>`)
        .addField('Ilość Osób', message.guild.memberCount)
        .addField('Zdjęcie zaproszenia', message.guild.discoverySplashURL({dynamic: true}) || "Nie posiada")
        .addField('Bannner serwera', message.guild.bannerURL({dynamic: true}) || "Nie posiada")
        .addField('Level weryfikacji', ver[message.guild.verificationLevel])
        .addField('Ilość ról', roles.length)
        .addField('Ilość kanałów', channels.length)
        .addField('Region', regions[message.guild.region])
        .addField('Boosty', message.guild.premiumSubscriptionCount)
        .addField('Level boostów', message.guild.premiumTier)
        .addField('Avatar Serwera', `[Kliknij!](${avatarServer})`)
        .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(Embed);
    }
}
