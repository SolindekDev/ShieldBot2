const configClient = require('../utils/config/client')
const sender = require('../utils/senders/message')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "guildCreate",
    run: async (guild) => {
        let defaultChannel = "";
        guild.channels.cache.forEach((channel)=>{
            if(channel.type == "text" && defaultChannel == "") {
                if(channel.permissionsFor(guild.me).has("SEND_MESSAGES")) {
                  defaultChannel = channel;
                }
              }
        })
        if (defaultChannel) {
            const GoodEmbed = new MessageEmbed()
                .setTitle('Dzięki za dodanie!')
                .setColor('#002d96')
                .setDescription(`Cześć! Jestem **ShieldBot 2v** mów mi "Tarcza" będe pomagać tworzyć ci twój wspaniały serwer, posiadam komendy które pomogą ci w prowadzeniu serwera oraz aby troche umilić czas. Poniżej podaje ci najważniejsze informacje/komendy:`)
                .addField(`<:chat:854994483325435964> Prefix`, '`s!`')
                .addField(`<:likeserce:854994483036291113> Wszystkie komendy`, '`s!help`')
                .addField(`<:hammer:854994483389005824> Ustawienie powitania`, '`s!ustaw`')
                .addField(`<:hammer:854994483389005824> Linki`, '(Strona Internetowa)[https://shieldbot.gq/]')
                .setThumbnail(guild.client.user.displayAvatarURL({dynamic: true}))
                .setFooter(configClient.footer, guild.client.user.displayAvatarURL({dynamic: true}))
            defaultChannel.send(GoodEmbed)
        }
    }
}