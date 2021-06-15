const sender = require('../../utils/senders/message')

module.exports = {
    name: "staff",
    category: "bot",
    aliases: ["zarzad", "owners", "tworcy", "personel"],
    description: "Lista zarządu bota",
    run: async (client, message, args) => {
        sender.some(message.channel, `**Owner**
        Solindek#4773
        **Developer**
        xNekoo.#0001
        **Admin**
        BanslebenMusic#0225
        **Bug Report**
        Kamack38#0038
        `, `Staff`, message)
    }
}
