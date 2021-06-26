
const configClient = require('../utils/config/client')
const sender = require('../utils/senders/message')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "guildCreate",
    run: async (msg) => {
        let defaultChannel = "";
        msg.channels.cache.forEach((channel)=>{
            if(channel.type == "text" && defaultChannel == "") {
                if(channel.permissionsFor(msg.me).has("SEND_MESSAGES")) {
                    if (channel.permissionsFor(msg.me).has("CREATE_INSTANT_INVITE"))
                    {
                        defaultChannel = channel;
                    }
                }
              }
        })
        if (defaultChannel)
        {
                const invite = defaultChannel.createInvite({
                    maxAge: 10 * 60 * 1000,
                    maxUses: 10
                }, `Stworzone dla ShieldBOT'a`).then(specialInvite => {
                    const GoodEmbed = new MessageEmbed()
                    .setTitle('Dodano bota')
                    .setColor('GREEN')
                    .setDescription(`Bot dołączył na nowy serwer!`)
                    .addField(`Nazwa serwera`, msg.name)
                    .addField(`Ilość osób na serwerze`, msg.memberCount)
                    .addField(`Zaproszenie na serwer`, `[**Klikaj!**](https://discord.gg/${specialInvite.code})`)
                    .setFooter(configClient.footer)
                msg.client.channels.cache.get("857520734279827496").send(GoodEmbed)
                })
        }

        // **Zaproszenie na serwer** [Dołącz na serwer](${invite || "https://shieldbot.gq/"})
    }
}