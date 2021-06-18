const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client') 
const axios = require('axios')

module.exports = {
    name: "mcprofil",
    category: "przydatne",
    aliases: ["mc", "minecraft", "minecraftprofil", "minecraftp"],
    description: "Tworzy ankiete",
    run: async (client, message, args) => {
        const nicknameMinecraft = args.slice(0).join(" ")

        if (!nicknameMinecraft) {
            sender.error(message.channel, 'Nie podano nazwy profilu', message)
            return
        }
        if (nicknameMinecraft) {
            try {
                let lyrics, reposnse
                const url = "https://some-random-api.ml/mc?username=" + nicknameMinecraft
                responses = await axios.get(url.replace(/ /g, '%20'))
                lyrics = responses.data 
                if (lyrics.error == "Invalid minecraft user")
                {
                    sender.error(message.channel, 'Nie znaleziono podanego konta minecraft', message)
                    return
                }
                sender.some(message.channel, `Nazwa: **${lyrics.username}**
                UUID: **${lyrics.uuid}**`, 'Minecraft profil ' + nicknameMinecraft, message)
            }
            catch (e) {
                console.log(e)
                sender.error(message.channel, 'API nie odpowiada!', message)
            }
        }
    }
}
