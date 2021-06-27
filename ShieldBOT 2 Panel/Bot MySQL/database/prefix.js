module.exports = {
    prefixConnection: function(mysqlConnectionVariable) 
    {
        mysqlConnectionVariable.query('SELECT `prefix` FROM `prefix` WHERE `serwerid` = ' + message.guild.id, (err, results) => {
            if (err) return console.log(err.message)
            console.log(util.inspect(results[0]['prefix']))
            return util.inspect(results[0]['prefix'])
        })
    }
}