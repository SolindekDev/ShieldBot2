const configClient = require('../utils/config/client')
const sender = require('../utils/senders/message')
const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "guildMemberRemove",
    run: async (guild) => {
        const user = guild.user
        const servername = guild.guild.name
        const membercount = guild.guild.memberCount

        let joinChannel = db.get(`exit_channel_id_${guild.guild.id}`) || "null"
        let joinText = db.get(`exit_text_id_${guild.guild.id}`) || "null"

        if (joinChannel == "null")
        {
            return console.log('Nie znaleziono kanału')
        }
        else 
        {
            const channnelsend = guild.client.channels.cache.get(joinChannel)
                if (joinText == "null")
                {   
                    let avatarLink = `https://cdn.discordapp.com/avatars/${guild.user.id}/${guild.user.avatar}.png?size=4096`
                    const GoodEmbed = new MessageEmbed()
                        .setTitle('Osoba wyszła')
                        .setColor('#002d96')
                        .setDescription('<@' + user + '> Wyszedł z serwera')
                        //.setImage(`https://api.no-api-key.com/api/v2/welcome?username=${guild.user.username.replace(/ /g, '%20')}&user_image=` + avatarLink + `&text_heading=Osoba%20osoba%20weszla%20na%20serwer&background=https://wallpaperaccess.com/full/1169789.jpg`)
                        .setFooter(configClient.footer, guild.user.displayAvatarURL({dynamic: true}))
                        channnelsend.send(GoodEmbed)
                }
                else {
                    let avatarLink = `https://cdn.discordapp.com/avatars/${guild.user.id}/${guild.user.avatar}.png?size=4096`

                    const GoodEmbed = new MessageEmbed()
                    .setTitle('Osoba wyszła')
                    .setColor('#002d96')
                    .setDescription(joinText.replace(/{{user}}/g, '<@' + user + '>').replace(/{{servername}}/g, servername).replace(/{{membercount}}/g, membercount))
                    .setFooter(configClient.footer, guild.user.displayAvatarURL({dynamic: true}))
                    //.setImage(`https://api.no-api-key.com/api/v2/welcome?username=${guild.user.username.replace(/ /g, '%20')}&user_image=` + avatarLink + `&text_heading=Nowa%20osoba%20weszla%20na%20serwer&background=https://wallpaperaccess.com/full/1169789.jpg`)
                    channnelsend.send(GoodEmbed)
                }
        }
    }
}