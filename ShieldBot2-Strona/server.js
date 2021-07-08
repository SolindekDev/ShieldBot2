const express = require('express')
const app = new express()
const Discord = require('discord.js');
const client = new Discord.Client();
const os = require('os');
const { mem, cpu } = require('node-os-utils');
const ms = require('ms');

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

app.get('/statystyki', (req, res) => {
    var usedMemory = os.totalmem() -os.freemem(), totalMemory = os.totalmem();
    res.render('statystyki', {
        guilds: client.guilds.cache.size,
        members: client.guilds.cache.reduce((a, g) => a + g.memberCount, 0),
        channels: client.channels.cache.size,
        procesor: cpu.model(),
        watkiprocesora: cpu.count(),
        systemoperacyjny: os.type,
        ram: ((usedMemory/totalMemory) * 100).toFixed(2) + 'mb/2084mb'
    })
})

app.get('*', (req, res) => {
    res.status(404).render('error404')
})

app.get('/dodaj', (req, res) => {
    res.redirect('https://discord.com/oauth2/authorize?client_id=831470538480025610&permissions=8&scope=bot')
})

app.get('/support', (req, res) => {
    res.redirect('https://discord.gg/Sp2yT4HNJy')
})

app.listen(3000, () => {
    console.log("http://localhost:3000/")
})

client.login('ODMxNDcwNTM4NDgwMDI1NjEw.YHVtSA.OYKj4F3V_3TKX5Qh4xEzPXPvqS0')