const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client')
const db = require('quick.db');
const { text } = require('figlet');

module.exports = {
    name: "ustaw",
    category: "config",
    aliases: ["set", "setjoin", "setexit", "ustawpowitanie", "ustawpozegnanie"],
    description: "Ustawiasz kanał powitania/pożegnania oraz jego tekst",
    run: async (client, message, args) => {
        const textorchannel = args[0]
        const arguement2 = args[1]
        const channelMentions = message.mentions.channels.first()
        const textJoinExit = args.slice(2).join(' ')
        
        if(!message.member.hasPermission(["KICK_MEMBERS"])) {
            sender.error(message.channel, "Nie posiadasz odpowiednich uprawnień! `KICK_MEMBERS`", message)
            return
        }
        if (textorchannel == "state")
        {
            let joinChannel = db.get(`join_channel_id_${message.guild.id}`)
            let joinText = db.get(`join_text_id_${message.guild.id}`)
            let exitChannel = db.get(`exit_channel_id_${message.guild.id}`)
            let exitText = db.get(`exit_text_id_${message.guild.id}`)
            if (joinChannel) 
            {
                joinChannel = '<#' + db.get(`join_channel_id_${message.guild.id}`) + '>'
            }
            else {
                joinChannel = "Nie ustawiono"
            }
            if (joinText) 
            {
                joinText = db.get(`join_text_id_${message.guild.id}`).replace(/{{user}}/g, '<@831470538480025610>').replace(/{{servername}}/g, message.guild.name).replace(/{{membercount}}/g, message.guild.memberCount)
            }
            else {
                joinText = "Nie ustawiono"
            }
            if (exitChannel) 
            {
                exitChannel = '<#' + db.get(`exit_channel_id_${message.guild.id}`) + '>'
            }
            else {
                exitChannel = "Nie ustawiono"
            }
            if (exitText) 
            {
                exitText = db.get(`exit_text_id_${message.guild.id}`).replace(/{{user}}/g, '<@831470538480025610>').replace(/{{servername}}/g, '**'+message.guild.name+'**').replace(/{{membercount}}/g, '**'+message.guild.memberCount+'**')
            }
            else {
                exitText = "Nie ustawiono"
            }

            const GoodEmbed = new MessageEmbed()
                .setTitle('Ustawienia serwera')
                .setColor('#002d96')
                .addField('Kanał powitań', joinChannel)
                .addField('Tekst powitań', joinText)
                .addField('Kanał pożegnań', exitChannel)
                .addField('Tekst pożegnań', exitText)
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(GoodEmbed)
            return
        }
        if (textorchannel == 'join')
        {
            if (arguement2 == "text")
            {
                if (textJoinExit)
                {
                    if (textJoinExit.includes('{{user}}'))
                    {
                        if (db.get(`join_channel_id_${message.guild.id}`))
                        {
                            db.set(`join_text_id_${message.guild.id}`, textJoinExit)
                            sender.succes(message.channel, 'Pomyślnie ustawiono tekst powitania!', message)
                            return
                        }
                        else {
                            sender.error(message.channel, `Nie ustawiłeś kanału powitania! 
                            
                            \`s!ustaw join channel #kanal-powitan\``, message)
                            return
                        }
                    }
                    else {
                        sender.error(message.channel, `W tekscie powitania nie podałeś zmiennej \`\{\{user\}\}\``, message)
                        return
                    }
                }
                else {
                    sender.error(message.channel, `Nie podałeś tekstu powitania
                    
                    **Zmiennne**
                    \`\{\{user\}\}\` - Oznacza osobę
                    \`\{\{membercount\}\}\` - Ilość osób na serwerze
                    \`\{\{servername\}\}\` - Wpisuje nazwe serwera `, message)
                    return
                }
            }   
            if (arguement2 == "channel")
            {
                if (channelMentions)
                {
                    db.set(`join_channel_id_${message.guild.id}`, channelMentions.id)
                    sender.succes(message.channel, 'Pomyślnie ustawiono kanał powitań!', message)
                }
                else {
                    sender.error(message.channel, `Nie oznaczyłeś kanału do którego ma wysyłać wiadomości o powitaniu`, message)
                    return
                }
            }
            else {
                sender.error(message.channel, `Nie podano odpowiednich argumentów
            
                \`s!ustaw join/exit channel/text/state #channel/text\``, message)
                return
            }
        }
        else if (textorchannel === 'exit')
        {
            if (arguement2 == "text")
            {
                if (textJoinExit)
                {
                    if (textJoinExit.includes('{{user}}'))
                    {
                        if (db.get(`exit_channel_id_${message.guild.id}`))
                        {
                            db.set(`exit_text_id_${message.guild.id}`, textJoinExit)
                            sender.succes(message.channel, 'Pomyślnie ustawiono tekst pożegnania!', message)
                            return
                        }
                        else {
                            sender.error(message.channel, `Nie ustawiłeś kanału pożegnania! 
                            
                            \`s!ustaw exit channel #kanal-pozegnan\``, message)
                            return
                        }
                    }
                    else {
                        sender.error(message.channel, `W tekscie pozegnania nie podałeś zmiennej \`\{\{user\}\}\``, message)
                        return
                    }
                }
                else {
                    sender.error(message.channel, `Nie podałeś tekstu pozegnania
                    
                    **Zmiennne**
                    \`\{\{user\}\}\` - Oznacza osobę
                    \`\{\{membercount\}\}\` - Ilość osób na serwerze
                    \`\{\{servername\}\}\` - Wpisuje nazwe serwera `, message)
                    return
                }
            }   
            if (arguement2 == "channel")
            {
                if (channelMentions)
                {
                    db.set(`exit_channel_id_${message.guild.id}`, channelMentions.id)
                    sender.succes(message.channel, 'Pomyślnie ustawiono kanał pożegnań!', message)
                }
                else {
                    sender.error(message.channel, `Nie oznaczyłeś kanału do którego ma wysyłać wiadomości o pożegnaniu`, message)
                    return
                }
            }
            else {
                sender.error(message.channel, `Nie podano odpowiednich argumentów
            
                \`s!ustaw join/exit channel/text/state #channel/text\``, message)
                return
            }
        }
        else {
            sender.error(message.channel, `Nie podano odpowiednich argumentów
            
            \`s!ustaw join/exit/state channel/text #channel/text\``, message)
            return
        }
    }
}
