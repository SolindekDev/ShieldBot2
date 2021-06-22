const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client') 

module.exports = {
    name: "eval",
    category: "dev",
    aliases: ["e", "evalcode", "code", "launchcode"],
    description: "Wykonuje podano kod w JavaScript",
    run: async (client, message, args) => {
        const result = args.slice(0).join(" ");
        if (message.author.id == "644446151210172447" || message.author.id == "572677844023640084")
        {
            if (!result)
            {

                sender.error(message.channel, 'Nie podano kodu do wykonaniu!', message)
                return
            }
            if (result.includes('client.token') || result.includes('const config = require("../config")' +
                'config.token'))
            {
                sender.error(message.channel, 'Nie możemy wykonać kodu ze względu bezpieczeństwa!', message)
                return
            }
            try {
                let evaled = eval(result);
                console.log(result);
                let resultSuccess = new MessageEmbed()
                    .setColor("GREEN")
                    .setTitle("Sukces")
                    .addField(`Wejście:\n`, '```\n' + `${args.slice(0).join(" ")}` + '```', false)
                    .addField(`Wyjście:\n`, '```\n' + evaled + '```', true)
                    .addField(`Typ:\n`, '```\n' + typeof(evaled) + '```', false)
                    .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
                message.channel.send(resultSuccess)

            } catch (error) {
                let resultError = new MessageEmbed()
                    .setColor("#e31212")
                    .setTitle("Error")
                    .addField(`Wejście:\n`, '```\n' + `${args.slice(0).join(" ")}` + '```', false)
                    .addField(`Błąd:\n`, '```\n' + `${error.message}` + '```', true)
                    .addField(`Typ:\n`, '```\n' + typeof(error) + '```', false)
                    .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
                return message.channel.send(resultError)
            }
        }
        else {
            sender.error(message.channel, 'Nie jesteś właścicielem bota!', message)
            return
        }


    }
}