const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const DiscordJS = require('discord.js')
const configClient = require('../../utils/config/client')
const figlet = require('figlet');

module.exports = {
    name: "kamienpapiernozyce",
    category: "4fun",
    aliases: ["kpn", "rockpaperscissors"],
    description: "Grasz w Kamień, Papier, Nożyce",
    run: async (client, message, args) => {
        const rps = ['rock', 'paper', 'scissors']
        const rps2 = ['kamien', 'papier', 'nożyce']
        const botchoose = rps[Math.floor(Math.random() * rps.length)]
        const botchoose2 = rps[Math.floor(Math.random() * rps2.length)]
        const choosement = args[0]
        if(!choosement) {
            sender.error(message.channel, 'Nie wybrałeś argumentu do bitwy \n\n\ np. `kamien`, `nożyc`, `papier`, `rock`, `paper`, `scissors`', message)
            return;
        } else {
                if (choosement == 'papier' || choosement == 'kamien' || choosement == "nożyc")
                {
                    const rpsfight = new MessageEmbed()
                    .setTitle('Papier, Kamień, Nożyce')
                    .setColor('#4169E1')
                    .addField('Ty wybrałeś', `\`${choosement}\``, false)
                    .addField('Ja wybrałem', `\`${botchoose2}\``, false)
                    .setFooter(configClient.footer, `${message.author.displayAvatarURL({dynamic:true})}`)
                    message.channel.send(rpsfight)
                    if(choosement < botchoose2) {
                        sender.succes(message.channel, 'Wygrałeś!', message)
                        return
                    } else if(choosement == botchoose2) {
                        sender.succes(message.channel, 'Remis!', message)
                        return
                    } else if(choosement > botchoose2) {
                        sender.succes(message.channel, 'Hah, Ja wygrałem', message)
                        return
                    }
                }
                if (choosement == 'rock' || choosement == 'paper' || choosement == "scissors")
                {
                    const rpsfight = new MessageEmbed()
                    .setTitle('Papier, Kamień, Nożyce')
                    .setColor('#4169E1')
                    .addField('Ty wybrałeś', `\`${choosement}\``, false)
                    .addField('Ja wybrałem', `\`${botchoose}\``, false)
                    .setFooter(configClient.footer, `${message.author.displayAvatarURL({dynamic:true})}`)
                    message.channel.send(rpsfight)
                    if(choosement < botchoose) {
                        sender.succes(message.channel, 'Wygrałeś!', message)
                        return
                    } else if(choosement == botchoose) {
                        sender.succes(message.channel, 'Remis!', message)
                        return
                    } else if(choosement > botchoose) {
                        sender.succes(message.channel, 'Hah, Ja wygrałem', message)
                        return
                    }
                }
                
            }
        
        }
}
