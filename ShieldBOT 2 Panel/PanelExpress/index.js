const express  = require('express');
const session  = require('express-session');
const passport = require('passport');
const Strategy = require('./lib').Strategy;
const app      = express();
const mysql = require('mysql')
const Discord = require('discord.js')
const client = new Discord.Client();

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
app.get('/info', checkAuth, async function(req, res) {
    console.log(req.user)
    if (req.query.server)
    {
        connection.query
    }
    // botOnGuild(req.user)
    res.render('panel', {
        serverCode: req.query.server,
        client: client,
        username: req.user.username,
        codeavatar: req.user.avatar,
        id: req.user.id,
        discriminator: req.user.discriminator,
        guilds: req.user.guilds,
        connectionMysql: connection,
        
    }, )
});


function checkAuth(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
}


app.listen(5000, function (err) {
    if (err) return console.log(err)
    console.log('Listening at http://localhost:5000/')
})