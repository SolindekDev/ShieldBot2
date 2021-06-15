const { MessageEmbed } = require("discord.js")

module.exports = {
    name: "ready",
    run: async (client) => {
        console.log(`Bot został odpalony!`);
    }
}