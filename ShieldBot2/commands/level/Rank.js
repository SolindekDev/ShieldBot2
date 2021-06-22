const { MessageEmbed, MessageAttachment } = require("discord.js");
const db = require("quick.db");
const canvaCord = require('canvacord')
const configClient = require('../../utils/config/client')
const s = require('../../utils/senders/message')

module.exports = {
    name: "rank",
    category: "level",
    aliases: ["levele", "level", "mojlevel"],
    description: "Pokazuje twój level",
    run: async (client, message) => {

        if (!db.get(`lvl_k_${message.guild.id}`)) return s.error(message.channel, 'Na tym serwerze są wyłączone levele!', message)

        const user = message.mentions.users.first() || message.author

        // const hmm = new MessageEmbed()
        // .setAuthor(``)
        // .setColor("")
        // .setDescription(`> Twój Level: **${db.get(`ilvl_${user.id}_${message.guild.id}`) || 0}**\n> XP: **${db.get(`expp_${message.guild.id}_u_${user.id}`) || 0}/10**`)
        // .setFooter(``)
        // message.channel.send(hmm)
        
        const rank = new canvaCord.Rank()
        .setAvatar(user.displayAvatarURL({dynamic: true, format: "jpg"}))
        .setCurrentXP(db.get(`expp_${message.guild.id}_u_${user.id}`) || 0) 
        .setRequiredXP(200)
        // To już nie potrzebne :)
        .setBackground("IMAGE", "https://wallpaperaccess.com/full/1169789.jpg")
        .setLevel(db.get(`ilvl_${user.id}_${message.guild.id}`) || 0)
        .setProgressBarTrack('Level')
        .setStatus(user.presence.status)
        .setProgressBar("#2176ff", 'COLOR')// ?
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)

        rank.build().then(data => {
            const attachement = new MessageAttachment(data, `${message.author.username}Rank.png`)
            message.channel.send(attachement);
        });

    }
}