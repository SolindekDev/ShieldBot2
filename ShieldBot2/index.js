const { Collection, Client, MessageEmbed } = require("discord.js");
const client = new Client()

const configClient = require('./utils/config/client')
const commandsClient = require('./utils/config/commands')
const eventsHandler = require('./handlers/event')
const commandHandler = require('./handlers/command')
const sender = require('./utils/senders/message');
const message = require("./utils/senders/message");
const StateBot = require("./utils/bot/state");

client.commands = new Collection();
client.aliases = new Collection();

StateBot(client, 10000)
eventsHandler(client)
commandHandler(client) 

client.login("Njg2MjAyMTY3ODc4NzQ2Mjgy.XmTxkQ.vxZFeknqvAl1U4y1xbmTtZ3X2J8");