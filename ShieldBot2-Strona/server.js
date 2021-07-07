const express = require('express')
const app = new express()
const Discord = require('discord.js');
const client = new Discord.Client();

app.set('view engine', 'ejs')

client.on('ready', () => {
    console.log(`Zalogowano jako ${client.user.tag}`)
})

app.get('/', (req, res) => {
    res.render('index', {
        guilds: client.guilds.cache.size,
        members: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
        channels: client.channels.cache.size
    })
})

app.listen(3000, () => {
    console.log("http://localhost:3000/")
})

client.login('ODMxNDcwNTM4NDgwMDI1NjEw.YHVtSA.OYKj4F3V_3TKX5Qh4xEzPXPvqS0')