const { MessageEmbed, MessageAttachment } = require("discord.js");
const db = require("quick.db");
const configClient = require('../../utils/config/client')
const s = require('../../utils/senders/message')

module.exports = {
    name: "ban",
    aliases: ["b", 'zbanuj'],
    description: 'Banujesz podaną osobę',
    category: "Moderacja",
    run: async (client, message, args) => {

        if (!message.member.hasPermission(["BAN_MEMBERS"])) {
            s.error(message.channel, "Nie masz odpowiednich uprawnień! `BAN_MEMBERS`", message)
            return
        }

        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!banMember) {
            s.error(message.channel, "Nie podano osoby do zkickowania", message)
            return
        }

        let reason = args.slice(1).join(" ")
        if (!reason) {
            s.error(message.channel, "Nie podaj powód zbanowania", message)
            return
        }

        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            s.error(message.channel, "Bot nie może wykonać tej akcji, wejdź w role i daj roli ShieldBot permisije Administratorskie", message)
            return
        }

        if (banMember.id === message.author.id) {
            s.error(message.channel, "Nie możesz zbanować samego siebie", message)
            return
        }
        if (banMember.id === '831470538480025610')
        {            
            s.error(message.channel, "Nie możesz zbanować ShieldBota!!", message)
            return
        }

            const embed1 = new MessageEmbed()
            .setColor('#002d96')
            .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            .setAuthor("Zostałeś zbanowany")
            .addField(`Serwer`, `${message.guild.name}`, false)
            .addField(`Osoba zbanowana`, `<@${banMember.id}>`, false)
            .addField(`Admin`, `<@${message.author.id}>`, false)
            .addField(`Powód`, `${reason}`, false)
        try {
            await banMember.send(embed1)
        } catch (err)
        {

        }
        const embed2 = new MessageEmbed()
        .setAuthor("Zbanowano")
        .addField(`Osoba Zbanowana`, `<@${message.mentions.members.first().id}>`, false)
        .addField(`Admin`, `${message.author.tag}`, false)
        .addField(`Powód`, `${reason}`, false)
        .setColor('#002d96')
        .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
        try {
            message.channel.send(embed2)
        } catch (err)
        {

        }
        try {
            await banMember.ban({ reason: reason})
        }
        catch (err)
        {
            s.error('Osoba jakiś cudem nie mogła zostać zbanowana, spróbuj przesunąć range bota wyżej')
        }
    }
}