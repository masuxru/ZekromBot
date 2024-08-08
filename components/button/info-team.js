const { ButtonInteraction } = require('discord.js');
const discord = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'team3',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const jsonData = {
            "content": null,
            "embeds": [
                {
                    "title": "SlyverWorld Team:",
                    "description": "**Hierarchie und Aufteilung der Teammitglieder**\n\nDie folgende Hierarchie zeigt direkt auf,\nwelche Aufgabenbereiche von den\neinzelnen Teammitgliedern abgedeckt werden.\n\n<@&601130947831922741>: Der Owner überwacht auf eine möglichst \nneutrale Art den reibungslosen Ablauf.\n<@349927269499666434>\n\n<@&1108030717390241822>: Die Direktion ist die rechte Hand des \nOwners für Entscheidungen der oberen \nSerververwaltung.\n<@1034123603924484128>\n\n<@&1082064851100237844>: Die Manager verweisen Teamler in ihre \nAufgabenbereiche und verwalten den Server.\n<@924727350346780714>\n<@1034123603924484128>\n<@452190296948736000>\n<@990455666068033596>\n\n<@&1125122019156037733>: Die Head Admins arbeiten eng mit \ndem Management zusammen und repräsentieren \nden administrativen Bereich.\n<@887399821013569566>\n<@945684129226317844>\n\n<@&778314696587477002>: Die Admins sind das Aushängeschild des \nServers und verbinden die Member mit dem \nServerteam.\n<@537247231724617728>\n<@830235311505408060>\n<@350640727488724992>\n<@813463827958071296>\n\n<@&974742920664055828>: Developer stellen Bots für den \nServer ein und schreiben eigenen Code für das \nTeam.\n<@256834191394603009>\n<@887399821013569566>\n\n<@&962054094443388948>: Head-Moderatoren tragen \nBeschwerden zusammen und sind diejenigen, \nwelche das Bindeglied zwischen Admins und \nModeratoren bilden.\n<@1062424413812838400>\n<@1058043320766566510>\n<@358965690071252993>\n<@463975204121477121>\n<@985435634678259753>\n<@726333269985067018>\n<@1082661021627469854>\n<@402069936387915778>\n\n<@&601132986611793930>: Moderatoren übernehmen die \nChatverwaltung und Kommunizieren in \nöffentlichen Kanälen mit den Usern.\n<@1071200650043588610>\n<@177443405675102208>\n<@771445667754672158>\n<@904171698369228880>\n<@1002214895665827890>\n<@1052999249333338162>\n<@591308744923807786>\n<@935612151589113888>\n<@988847800391446558>\n<@435061056608403458>\n<@714156407980687430>\n\n<@&791355452063350785>: Die Supporter bearbeiten Tickets, \nhelfen Usern auf möglichst freundliche Art und \nWeise und halten den Server aktiv.\n<@1078681495268511798>\n<@1077000518234296410>\n<@707687769840943174>\n<@1083745958900277408>\n<@954703191205892116>\n<@825833896301166672>\n<@791809905408999425>\n<@430444554924195862>\n<@902245510604283914>\n<@1128719083773366283>\n<@451757658605617182>",
                    "color": 3670088,
                    "footer": {
                    "text": "Boo"
                    },
                    "image": {
                        "url": "https://cdn.discordapp.com/attachments/988173806881341460/1054060232558518272/20221218_163835.gif"
                    },
                    "thumbnail": {
                        "url": "https://cdn.discordapp.com/attachments/988173806881341460/1109851766100594818/swblack.png"
                    }
                }
            ],
            "attachments": []
        };
        const embedData = jsonData.embeds[0];
        const embed = new discord.EmbedBuilder(embedData)
        interaction.reply({ embeds: [embed], ephemeral: true});
    }
};