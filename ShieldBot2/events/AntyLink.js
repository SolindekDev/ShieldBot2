
    const configClient = require('../utils/config/client')
    const sender = require('../utils/senders/message')
    const { MessageEmbed } = require('discord.js')
    const db = require('quick.db')
    
    module.exports = {
        name: "message",
        run: async (msg) => {
            let dbget = db.get(`antybot_link_${msg.guild.id}`) || 'false'
                if (dbget == "true")
                {
                    if(msg.member.hasPermission(["KICK_MEMBERS"])) {
                        return;
                    }
                        const content = msg.content

                        if (msg.content.includes("discord.gg/" || "https://discord.gg/" || "discordapp.com/invite/" || "https://discordapp.com/invite/"))
                        {
                            return;
                        }
                        if (msg.content.includes('https://') || msg.content.includes('http://') || msg.content.includes('www.') || msg.content.includes('.pl') || msg.content.includes('www.')  || msg.content.includes('.de') || msg.content.includes('.com')) 
                        {
                            msg.delete()
                            const Embed = new MessageEmbed()
                                .setAuthor("Coś ci nie pykło " + msg.author.username + " :)")
                                .setColor("RED")
                                .setDescription("```yaml\nNie wysyłaj linków!``` \nTen serwer ochrania **ShieldBot** który umożliwia włączenie trybu **AntyLinks**")
                                .setFooter(configClient.footer, msg.author.displayAvatarURL({dynamic: true}))
                            return msg.channel.send(Embed);
                        }
                }
        }
    }