
const configClient = require('../utils/config/client')
const sender = require('../utils/senders/message')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "guildDelete",
    run: async (msg) => {
    
                    const GoodEmbed = new MessageEmbed()
                    .setTitle('Usunięto bota')
                    .setColor('RED')
                    .setDescription(`Bot został usunięty z serwera!`)
                    .addField(`Nazwa serwera`, msg.name)
                    .addField(`Ilość osób na serwerze`, msg.memberCount)
                    .setFooter(configClient.footer)
                msg.client.channels.cache.get("857520734279827496").send(GoodEmbed)
        // **Zaproszenie na serwer** [Dołącz na serwer](${invite || "https://shieldbot.gq/"})
    }
}