const sender = require('../../utils/senders/message')
const { MessageEmbed } = require('discord.js')
const configClient = require('../../utils/config/client')
const configCommands = require('../../utils/config/commands.js')

module.exports = {
    name: "help",
    category: "bot",
    aliases: ["pomoc", "helpme", "pomoć"],
    description: "Lista pomocy bota",
    run: async (client, message, args) => {
        if (args[0])
        {
            const command = client.commands.get(args[0]) || client.commands.find((command) => command.aliases.includes(args[0]));
            if (!command) return sender.error(message.channel, "Nie znaleziono podanej komendy!", message);
            const GoodEmbed = new MessageEmbed()
                .setTitle(`Komenda ${command.name}`)
                .setColor('#002d96')
                .addField('Nazwa komendy', command.name || 'Brak')
                .addField('Opis komendy', command.description || 'Brak')
                .addField('Kategoria komendy', command.category || "Brak")
                .addField('Aliasy komendy', command.aliases.map((alias) => `\*\*${alias}\*\*`).join(", ") || 'Brak')
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(GoodEmbed)
            return;
        }
        const GoodEmbed = new MessageEmbed()
            .setAuthor(`Pomoc!`, message.author.displayAvatarURL({dynamic: true}))
            .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
            .setColor('#002d96')
            .addField('<:chat:854994483325435964> **• Moderacja**', '\`ban\`, \`clear\`, \`delwarn\`, \`kick\`, \`slowmode\`, \`warn\`, \`warns\`')
            .addField('<:gift:854994483354664971> **• Levele**', '\`rank\`, \`lvl-config\`')
            .addField('<:link:854994482997755936> **• Config**', '\`ustaw\`, \`antybot\`, \`propozycje\`')
            .addField('<:hammer:854994483389005824> **• Przydatne**', `\`ankieta\`, \`avatar\`, \`serverinfo\`, \`channelinfo\`, \`userinfo\`
            \`say\`, \`pogoda\`, \`crypto\`, \`mcprofil\`, \`binary\`, \`pogoda\``)
            .addField('<:likeserce:854994483036291113> **• 4Fun**', `\`8ball\`, \`ad\`, \`affect\`, \`beautiful\`, \`blur\`, \`captcha\`,
            \`ciufka\`, \`confusedstonk\`, \`facepalm\`, \`hitler\`, \`jail\`,
            \`kamienpapiernozyce\`, \`lyrics\`, \`malowanie\`, \`notstonks\`,
            \`pornhubcomment\`, \`presentation\`, \`putin\`, \`sepia\`, \`ship\`
            \`pukpuk\`, \`trigger\`, \`tweet\`, \`wanted\`, \`zarty\`, \`zawod\`
            \`pixelate\`, \`negate\`, \`greyscale\`, \`sketchy\`, \`flip\`, \`mem\`
            \`token\``)
            .addField('<:dev:854994483322159134> **• Bot**', '\`pomoc\`, \`invite\`, \`linki\`, \`ping\`, \`staff\`, \`botinfo\`')
            .addField('<:1556blurplerules:854994483296206878> **• Dev**', '\`eval\`, \`gban\`, \`ungban\`')
            .setDescription(`Aby wyszukać inforamcje o danej komendzie wpisz: **pomoc <komenda>**`)
            .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(GoodEmbed)
    }
}
