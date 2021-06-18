const configClient = require('../utils/config/client')
const sender = require('../utils/senders/message')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "message",
    run: async (message) => {
        if (message.channel.type === "dm")
        {
            return;
        }
        const wzmianka = new RegExp(`^<@!?${configClient.id}>( |)$`);
        if (message.content.match(wzmianka)) {
            const EmbedMatchWzmianka = new MessageEmbed()
                .setAuthor("Wpomniano mnie!" , `https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Twemoji2_1f514.svg/1024px-Twemoji2_1f514.svg.png`)
                .setDescription('Mój prefix to: `s!` \nListe komend uzyskasz po wpiszaniu komendy: `s!help` \n \n [Wejdź na nasz support](https://discord.gg/f7EwjaMYZU) \n  [Odwiedź naszą stronę](https://shieldbot.gq) \n [Chcesz być cool? Dodaj naszego bota!](https://discord.com/api/oauth2/authorize?client_id=831470538480025610&permissions=8&scope=bot) \n')
                .setColor('#002d96')
                .setFooter(configClient.footer, message.author.displayAvatarURL({dynamic: true}))
            message.channel.send(EmbedMatchWzmianka);
            }     
    }
}