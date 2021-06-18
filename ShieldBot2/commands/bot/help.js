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
            .setDescription(`Aby wyszukać inforamcje o danej komendzie wpisz: **pomoc <komenda>**
            
            <:hammer:854994483389005824> **• Przydatne**
            \`ankieta\`,\`avatar\`,\`serverinfo\`,\`channelinfo\`,\`userinfo\`
            \`say\`,\`pogoda\`,\`btc\`,\`mcprofil\`,\`binary\`

            <:likeserce:854994483036291113> **• 4Fun**
            \`ciufka\`, \`confusedstonk\`, \`facepalm\`, \`hitler\`, \`jail\`, 
            \`malowanie\`, \`notsonks\`, \`presentation\`, \`putin\`, \`sepia\`,
            \`ship\`, \`trigger\`, \`wanted\`, \`blur\`, \`ad\`, \`affect\`, \`lyrics\`,
            \`knp\`, \`zarty\`, \`zawod\`
            
            <:dev:854994483322159134> **• Bot**
            \`pomoc\`,\`invite\`,\`nowosci\`,\`linki\``)
            .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        message.channel.send(GoodEmbed)
    }
}
