const sender = require('../../utils/senders/message')
const { MessageEmbed } = require("discord.js");
const configClient = require('../../utils/config/client')
const weather = require('weather-js')

module.exports = {
    name: "pogoda",
    category: "przydatne",
    aliases: ["weather", 'pogod'],
    description: "Wysyła pogodę na dane miejsce",
    run: async (client, message, args) => {
        const weatherLocation = args.slice(0).join(' ')

        weather.find({search: args.slice(0).join(' '), degreeType: 'C'}, function(err, result) {
            if(err) console.log(err);
            if (!weatherLocation) return sender.error(message.channel, 'Prosimy o podanie lokalizacji do sprawdzenia pogody!', message)
            if(result === undefined || result.length === 0) return sender.error(message.channel, 'Nie prawidłowa lokalizacja!', message)
           
            const current = result[0].current;
            const location = result[0].location;
            const weatherinfo = new MessageEmbed()
                .setAuthor(`Prognoza pogody dla ${current.observationpoint}`)
                .setThumbnail(current.imageUrl)
                .setColor('#002d96')
                .addField('Strefa czasowa', `UTC${location.timezone}`, true)
                .addField('Temperatura', `${current.temperature}°`, true)
                .addField('Temperatura odczuwalna', `${current.feelslike}°`, true)
                .addField('Temperatura w cieniu', `${current.temperature - 7}°`, true)
                .addField('Prędkość wiatru', current.windspeed, true)
                .addField('Wilgotność', `${current.humidity}%`, true)
            message.channel.send(weatherinfo)
        });

        // weather.find({search: args.slice(0).join(' '), degreeType: 'C'}, function (error, result){
        //     if(error) {
        //         sender.error(message.channel, 'Prosimy o wykorzystanie komendy później!', message)
        //         console.log(error)
        //         return;
        //     }
        //     if(!args[0]) {
        //         sender.error(message.channel, 'Prosimy o podanie lokalizacji do sprawdzenia pogody!', message)
        //         return;
        //     }
    
        //     if(result === undefined || result.length === 0) {
        //         sender.error(message.channel, 'Nie prawidłowa lokalizacja!', message)
        //         return;
        //     }

        //     const current = result[0].current;
        //     const location = result[0].location;

        //     const weatherinfo = new MessageEmbed()
        //     .setDescription(`**${current.skytext}**`)
        //     .setAuthor(`Prognoza pogody dla ${current.observationpoint}`)
        //     .setThumbnail(current.imageUrl)
        //     .setColor('#00ff26')
        //     .addField('⏰ **Strefa czasowa:**', `UTC${location.timezone}`, true)
        //     .addField('🌡 **Temperatura:**', `${current.temperature}°`, true)
        //     .addField('🤒 **Temperatura odczuwalna:**', `${current.feelslike}°`, true)
        //     .addField('💨 **Prędkość wiatru:**', `current.winddisplay`, true)
        //     .addField('💧 **Wilgotność:**', `${current.humidity}%`, true)
        //     message.channel.send(weatherinfo)
        //     })        
    }
}
