const Discord = require('discord.js');
const client = new Discord.Client();
const mysql      = require('mysql');
const util = require('util')

const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'panelshieldbota'
});
connection.connect(function(err) {
    if (err) {
      console.error('Nie udało się połaczyć z bazą danych: ' + err.message);
      return;
    }
   
    console.log('Połączono z bazą danych ' + connection.threadId);
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
    connection.query('SELECT `prefix` FROM `prefix` WHERE `serwerid` = ' + message.guild.id, (err, results) => {
        if (err) return console.log(err.message)
        console.log(util.inspect(results[0]['prefix']))
        const prefix = util.inspect(results[0]['prefix']).replace(/'/g, '')

        if (message.content === prefix + "ping")
        {
            message.channel.send('Pong!')
        }
    })
})

client.login('Njg2MjAyMTY3ODc4NzQ2Mjgy.XmTxkQ.vxZFeknqvAl1U4y1xbmTtZ3X2J8');