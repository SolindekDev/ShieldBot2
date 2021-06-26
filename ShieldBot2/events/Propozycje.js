const configClient = require('../utils/config/client')
const sender = require('../utils/senders/message')
const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "message",
    run: async (message) => {
        let ChannelSuggestions = db.get(`kanal_propozycji_${message.guild.id}`)

        if (ChannelSuggestions) {
            const suggestionsChannel = message.client.channels.cache.get(ChannelSuggestions)
            if (suggestionsChannel) {
                if (message.channel.id == suggestionsChannel.id)
                {
                    try {
                        if (message.author.bot == false)
                        {
                            if (message.content.startsWith('%'))
                            {
                                message.delete()
                                suggestionsChannel.send(`<@${message.author.id}> Komentarz: **${message.content.replace('%', '')}**`)
                            }
                            else {
                                message.delete()
                                let getContent = message.content
        
                                const GoodEmbed = new MessageEmbed()
                                    .setTitle("Propozycja")
                                    .setColor('#002d96')
                                    .setDescription(getContent)
                                    .setFooter(`Komentarz: %twoja wiadomość  |  Propozycja napisana przez ${message.author.tag}  |  ` + configClient.footer , message.author.displayAvatarURL({dynamic: true}))
                                suggestionsChannel.send(GoodEmbed).catch(e => {
                                    return;
                                }).then(messageEmbed => {
                                    messageEmbed.react('<:check:857233344458522674>')   
                                    messageEmbed.react('<:notcheck:857233344291274753>')
                                })
                            }
                        }
                    }
                    catch (e) {
                        return console.log('nie moge wysłać')
                    }
                }
            }
            else {
                return console.log('nie ma2')
            }
        }
        else {
            return console.log('nie ma')
        }
    }
}