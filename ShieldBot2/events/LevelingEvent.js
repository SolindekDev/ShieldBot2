const db = require("quick.db");
const { MessageEmbed } = require("discord.js")
const configClient = require('../utils/config/client')
const sender = require('../utils/senders/message')

module.exports = {
    name: "message",
    run: async (message) => {

        //if (!db.get(`lvl_${message.guild.id}`) return;
        
        if(message.author.bot || message.channel.type === "dm" || !message.guild) return;

        //if (db.get(`lvl_${message.guild.id}`)) {


            if (db.get(`expp_${message.guild.id}_u_${message.author.id}`)) {

                db.add(`expp_${message.guild.id}_u_${message.author.id}`, 1)

            } else {
                db.set(`expp_${message.guild.id}_u_${message.author.id}`, 1)
                db.set(`ilvl_${message.author.id}`, 1)
            }

            if (db.get(`expp_${message.guild.id}_u_${message.author.id}`) === 200) {
                const lvl_channel = message.client.channels.cache.get(db.get(`lvl_k_${message.guild.id}`))
                db.delete(`expp_${message.guild.id}_u_${message.author.id}`)
                db.set(`ilvl_${message.author.id}_${message.guild.id}`, db.get(`ilvl_${message.author.id}_${message.guild.id}`)+1)
                
                if (lvl_channel) {
                    //const lvl_message = db.get(`lvlmessage_${message.guild.id}`)

                    //if (lvl_message) {
                    //lvl_channel.send(lvl_message)
                    //}

                    sender.levelup(lvl_channel, `Gratulacje **${message.author.tag}**! Wbiłeś/aś **${db.get(`ilvl_${message.author.id}_${message.guild.id}`)}** level!`, message)


                } else if (!lvl_channel) {
                    // const lvlup_embed = new MessageEmbed()
                    // .setAuthor("Level Up!", message.author.displayAvatarURL({ dynamic: true }))
                    // .setDescription(`> Gratulacje **${message.author.tag}**! Wbiłeś/aś **${db.get(`ilvl_${message.author.id}_${message.guild.id}`)}** level na serwerze **${message.guild.name}**!`)
                    // .setColor("GREEN")
                    // .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                    // message.author.send(lvlup_embed)
                    sender.levelup(message.author, `Gratulacje **${message.author.tag}**! Wbiłeś/aś **${db.get(`ilvl_${message.author.id}_${message.guild.id}`)}** level!`, message)
                }
            }
        //}
    }
}