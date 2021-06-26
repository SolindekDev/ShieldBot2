const { MessageEmbed, MessageAttachment } = require("discord.js");
const db = require("quick.db");
const canvaCord = require('canvacord')
const configClient = require('../../utils/config/client')
const s = require('../../utils/senders/message')

module.exports = {
    name: "topleveli",
    category: "level",
    aliases: ["topka", "toplevel", "toplvl"],
    description: "Pokazuje twój level",
    run: async (client, message) => {
        message.members.forEach(member => {
            console.log('level: ' + db.get(`ilvl_${member.id}_${message.guild.id}`))
        })
    }
}