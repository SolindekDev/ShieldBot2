module.exports = (client, MiliSeconds) => {
    setInterval(() => {
        let random = Math.floor((Math.random()*3) + 1); 

        if (random == 1)
        {
          client.user.setActivity(`Dodaj mnie na swój serwer 🥺`, ({type: "WATCHING"}));
        }
        else if (random == 3)
        {
          client.user.setActivity(`Opiekuje się ${client.guilds.cache.size} serwerami`, ({type: "WATCHING"}));
        }
        else if (random == 2)
        {
          client.user.setActivity(`Moim właścicielem jest Solindek`, ({type: "WATCHING"}));
        }
    }, MiliSeconds)
}
