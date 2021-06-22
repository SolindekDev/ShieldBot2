const configClient = require('../utils/config/client')
const sender = require('../utils/senders/message')
const db = require('quick.db')

module.exports = {
    name: "message",
    run: async (message) => {
        const prefix = configClient.prefix;

        if (message.author.bot) return;
        if (!message.guild) return;
        if (!message.content.startsWith(prefix)) return;

        let gban = db.get(`gban_${message.author.id}`)
        if (gban == "true")
        {
            return
        }
    
        // If message.member is uncached, cache it.
        if (!message.member) message.member = await message.guild.fetchMember(message);
    
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        
        if (cmd.length === 0) return;
        
        let command = message.client.commands.get(cmd);
        if (!command) command = message.client.commands.get(message.client.aliases.get(cmd));
    
        try {
            if (command) 
            command.run(message.client, message, args);
        }
        catch (e) {
            sender.error(message.channel, 'Komenda w czasie wykonowywania dostrzegła nie spodziewany błąd! Odrazu zgłoś to pod komendą zglos!\n\n `' + e + '`', message)
        }
        const { MessageEmbed } = require("discord.js")
    }
}