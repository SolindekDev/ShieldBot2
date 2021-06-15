const sender = require('../../utils/senders/message')
const { MessageEmbed } = require('discord.js')
const configClient = require('../../utils/config/client')

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
                .setColor('BLUE')
                .addField('Nazwa komendy', command.name)
                .addField('Opis komendy', command.description)
                .addField('Kategoria komendy', command.category)
                .addField('Aliasy komendy', command.aliases.map((alias) => `\`${alias}\``).join(" | "))
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(GoodEmbed)
            return;
        }
        sender.some(message.channel, 'Test aliasów', 'Test', message)
    }
}
