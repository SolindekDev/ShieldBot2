
const configClient = require('../utils/config/client')
const sender = require('../utils/senders/message')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "message",
    run: async (msg) => {
        let dbget = db.get(`antybot_invite_${msg.guild.id}`) || 'false'
        if (dbget == "true")
        {
            const content = msg.content

            if (msg.content.includes("discord.gg/" || "https://discord.gg/" || "discordapp.com/invite/" || "https://discordapp.com/invite/"))
            {
                msg.delete()
                const Embed = new MessageEmbed()
                    .setAuthor("Coś ci nie pykło " + msg.author.username + " :)")
                    .setColor("RED")
                    .setDescription("```yaml\nNie reklamuj się!``` \nTen serwer ochrania **ShieldBot 2.0** który umożliwia włączenie trybu **AntyInvite**")
                    .setFooter(configClient.footer, msg.author.displayAvatarURL({dynamic: true}))
                return msg.channel.send(Embed);
            }
        }
    }
}