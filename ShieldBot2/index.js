const { Collection, Client, MessageEmbed } = require("discord.js");

const client = new Client()
const configClient = require('./utils/config/client')
const commandsClient = require('./utils/config/commands')
const eventsHandler = require('./handlers/event')
const commandHandler = require('./handlers/command')

client.commands = new Collection();
client.aliases = new Collection();

eventsHandler(client)
commandHandler(client)

client.on("message", async message => {
    const prefix = "_";

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});

client.login(configClient.token);