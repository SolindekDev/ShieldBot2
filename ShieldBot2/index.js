const { Collection, Client, MessageEmbed } = require("discord.js");
const client = new Client()

const configClient = require('./utils/config/client')
const commandsClient = require('./utils/config/commands')
const eventsHandler = require('./handlers/event')
const commandHandler = require('./handlers/command')
const sender = require('./utils/senders/message');
const message = require("./utils/senders/message");

client.commands = new Collection();
client.aliases = new Collection();

eventsHandler(client)
commandHandler(client) 

client.login(configClient.token);