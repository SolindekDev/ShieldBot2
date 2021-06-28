const express  = require('express');
const session  = require('express-session');
const passport = require('passport');
const Strategy = require('./lib').Strategy;
const app      = express();
const mysql = require('mysql')
const Discord = require('discord.js')
const client = new Discord.Client();
const util = require('util')

client.login('Njg2MjAyMTY3ODc4NzQ2Mjgy.XmTxkQ.vxZFeknqvAl1U4y1xbmTtZ3X2J8')

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
  
app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/img', express.static(__dirname + 'public/img'))

// function botOnGuild(discordJSON) {
//     discordJSON.guilds.forEach(function(g) {
//             client.guilds.cache.forEach(function(gd) {
//                 if (gd.id === g.id)
//                 {
//                     console.log(gd.name)
//                 }
//             })
//     })
// }

app.set('view engine', 'ejs')

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

const scopes = ['identify', 'email', 'connections', 'guilds', 'guilds.join'];

passport.use(new Strategy({
    clientID: '686202167878746282',
    clientSecret: 'EF1VP7L2TOv3LkP4Mj46Z9QDiOSAHI-y',
    callbackURL: 'http://localhost:5000/callback',
    scope: scopes
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app.use(session({
    secret: 'youshallnotpass',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/login', passport.authenticate('discord', { scope: scopes }), function(req, res) {});
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/callback',
    passport.authenticate('discord', { failureRedirect: '/' }), function(req, res) { res.redirect('/info') } // auth success
);
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
app.get('/akt', async function(req, res) {
    if (!req.query.prefix)
    {
        await res.redirect('http://localhost:5000/info')
        return
    }
    if (!req.query.server)
    {
        await res.redirect('http://localhost:5000/info')
        return
    }
    connection.query("UPDATE `prefix` SET `serwerid`='"+ req.query.server +"',`prefix`='"+ req.query.prefix +"' WHERE `serwerid` = " + req.query.server, (results, err) => {
        return res.redirect('http://localhost:5000/info?good=Pomyślnie%20zaaktualizowano%20zmiany!&server=' + req.query.server)
    })
})

app.get('/info', checkAuth, async function(req, res) {
    //console.log(req.user)
    if (req.query.server)
    {
        // connection.query('SELECT `prefix` FROM `prefix` WHERE `serwerid` = ' + req.query.server, (err, results) => {
        //     if (err) {
        //         console.log(err.message)
        //         renderPanel()
        //         return
        //     }
        //     console.log(util.inspect(results[0]['prefix']))
        //     const prefix = util.inspect(results[0]['prefix']).replace(/'/g, '')
        //     res.render('panel', {
        //         serverCode: req.query.server,
        //         client: client,
        //         username: req.user.username,
        //         codeavatar: req.user.avatar,
        //         id: req.user.id,
        //         discriminator: req.user.discriminator,
        //         guilds: req.user.guilds,
        //         connectionMysql: connection,
        //         prefix: prefix
        //     }, )
        // })
        connection.query('SELECT `prefix` FROM `prefix` WHERE `serwerid` = ' + req.query.server, (err, results) => {
            if (err) {
                console.log(err.message)
                renderPanel()
                return
            }
            if (results)
            {
                console.log(util.inspect(results[0]['prefix']))
                const prefix = util.inspect(results[0]['prefix']).replace(/'/g, '')
                const members = client.guilds.cache.get(req.query.server).memberCount || 0
                const channels = client.guilds.cache.get(req.query.server).channels.cache.sort((a, b) => b.position - a.position).map(role => role.toString()) || 0
                res.render('panel', {
                    serverCode: req.query.server,
                    client: client,
                    username: req.user.username,
                    codeavatar: req.user.avatar,
                    id: req.user.id,
                    discriminator: req.user.discriminator,
                    guilds: req.user.guilds,
                    connectionMysql: connection,
                    prefix: prefix,
                    error: req.query.error,
                    good: req.query.good,
                    members: members,
                    channels: channels.length,
                }, )
            }
        })
    }
    else {
        renderPanel()
    }
    // botOnGuild(req.user)
    function renderPanel() {
        res.render('panel', {
            serverCode: req.query.server,
            client: client,
            username: req.user.username,
            codeavatar: req.user.avatar,
            id: req.user.id,
            discriminator: req.user.discriminator,
            guilds: req.user.guilds,
            connectionMysql: connection,
            prefix: 's!',
            error: req.query.error,
            good: req.query.good
        }, )
    }
});


function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}


app.listen(5000, function (err) {
    if (err) return console.log(err)
    console.log('Listening at http://localhost:5000/')
})