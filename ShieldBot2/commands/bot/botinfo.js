const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const DiscordJS = require('discord.js')
const configClient = require('../../utils/config/client')

module.exports = {
    name: "botinfo",
    category: "bot",
    aliases: ["staty", "stats", "statystyki", "statystykibota"],
    description: "Lista zarządu bota",
    run: async (client, message, args) => {
            // Versions
            const versionDJS = DiscordJS.version
            const versionNode = process.version
            // Modules 
            const os = require('os');
            const { mem, cpu } = require('node-os-utils');
            const ms = require('ms');
            // Variables System
            const cpuModel = cpu.model()
            const threadsProcessor = cpu.count()
            const nameSys = os.type + " " + os.release
            const usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
            const getpercentage = ((usedMemory/totalMemory) * 100).toFixed(2) + 'mb'
            // Variables Client
            const guilds = message.client.guilds.cache.size;
            const users = message.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
            const channels = message.client.channels.cache.size;
            const srednia = message.client.guilds.cache.reduce((a, g) => a + g.memberCount, 0) / message.client.guilds.cache.size;
            const GoodEmbed = new MessageEmbed()
                .setTitle('Statystyki Bota')
                .setColor('#002d96')
                .addField('Cache', `> Ilość Serwerów: **${guilds}**
                > Ilość Kanałów: **${channels}**
                > Ilość Użytkowników: **${users}**
                > Średnia Użytkowników na serwerze: **${Math.round(srednia)}**
                `)
                .addField('Serwer', `> Model Procesora: **${cpuModel}**
                > Nazwa systemu: **${nameSys}**
                > Zużycie pamięci RAM: **${getpercentage + "/1048mb"}**
                > Wątki procesora: **${threadsProcessor}**
                `)
                .addField('Biblioteki', `> Wersja DiscordJS: **${versionDJS}**
                > Wersja Node.JS: **${versionNode}**
                `)
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(GoodEmbed)
    }
}
