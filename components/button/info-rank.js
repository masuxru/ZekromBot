const { ButtonInteraction } = require('discord.js');
const discord = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'rank4',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const embed = new discord.EmbedBuilder()
            .setImage('https://cdn.discordapp.com/attachments/1037671361629405214/1074393851483131974/J8w2GMH.jpeg')
            .setColor('#9B59B6')
            
    
        const embed2 = new discord.EmbedBuilder()
            .setTitle('**Level-Rollen**')
            .setDescription('Auf SlyverWorld kannst du dir mit levelspezifischen Rollen einen Namen machen.\nDie Rollen, die du auf dem Server erhalten kannst, werden durch <@437808476106784770> und <@437808476106784770> verwaltet.')
            .addFields({name:'Rollen von Arcane', value:'<@&1074142958485516399> ab **Level 5**\n<@&1074142980476244000> ab **Level 10**\n<@&1074142983747796992> ab **Level 20**\n<@&1074142989603061891> ab **Level 30**\n<@&1074142994342613042> ab **Level 50**\n<@&843226097633853490> ab **Level 75**\n<@&843226093796327424> ab **Level 100**\n<@&894953531851808798> ab **Level 300**'})
            .addFields({name:'Nutzungshinweis', value:'Die Erfahrungspunkte, die für den Erhalt der Rollen wichtig sind, werden pro Nachricht jede Minute vergeben. Das Spammen von Nachrichten verschafft dir somit keinen Vorteil.'})
            .setColor('#9B59B6')
    
        const embed3 = new discord.EmbedBuilder()
            .setTitle('**Discord Nitro und Serverboosts**')
            .setDescription('Wenn du ein Nitro-Abonnement ($9.99) hast, erhälst du zwei Serverboosts gratis dazu. Wenn du den Server unterstützenmöchtest, kannst du diese gerne hier auf SlyverWorld nutzen.')
            .addFields({name:'SlyverWorld – Boosterbelohnungen', value:'Die Rolle <@&790407455322275881> wird an jede Nutzerin und jeden Nutzer vergeben, die SlyverWorld mit einem Serverboost unterstützen.\n\nWenn du deinen Boost drei Monate hier auf SlyverWorld benutzt, bekommst du als Dankeschön die Rolle <@&883271446435074058> oder <@&819627056073015377>!'})
            .addFields({name:'Wie kann ich mir eine eigene Rolle machen lassen?', value:'Wenn du beide Booster hier benutzt, kannst du dir eine sogenannte “Custom Role” (eigene Rolle) erstellen und anpassen lassen. Hierbei hast du freie Wahl über Name und Farbe!\n\nErstelle hierzu einfach ein Ticket in ⁠・support und warte, bis ein Moderatoren dir antwortet.'})
            .setColor('#9B59B6');
        const embed4 = new discord.EmbedBuilder()
            .setTitle('**Shop-Rollen**')
            .setDescription("Auf SlyverWorld kann man bei <@292953664492929025> einige Rollen im Tausch gegen die Bot-Währung kaufen.")
            .setColor('#9B59B6')
            .addFields({name:"**UnbelievaBoat-Rollen (nach Preis)**", value:"@💴 - :yen: 25,000\n@・ - :yen: 100,000\n@・ - :yen: 250,000\n<@&846069489090035722> - :yen: 2,500,000"})
    
        const embed5 = new discord.EmbedBuilder()
            .setTitle("Aktivitätsbelohnungen (“Activity Rewards”)")
            .setDescription("Nutzer, die einen hohen Grad an Aktivität zeigen, werden hier auch entsprechend belohnt!")
            .setColor('#9B59B6')
            .addFields({name:"**Sprachkanäle**", value:"Nutzerinnen und Nutzer, die sehr aktiv in den Sprachkanälen auf SlyverWorld sind, erhalten die Rolle <@&992451310974664735>"})
            .addFields({name:"**Textkanäle**", value:"Nutzerinnen und Nutzer, die sehr aktiv in den Textkanälen auf SlyverWorld sind, erhalten die Rolle <@&916030911110316132>"})
            .addFields[{name:"**Wie kann ich diese Rollen erhalten?**", value:"Die Rollen werden alle sieben Tage neu vergeben. Wer über die Zeit eine hohe Aktivität hatte, wird durch einen Statsbot ermittelt."}]
        const embed6 = new discord.EmbedBuilder()
            .setTitle("**Sonstige Rollen**")
            .setColor('#9B59B6')
            .setDescription("Neben den obengenannten Rollen gibt es natürlich noch viel mehr. Einige davon sieht man hier zusammengefasst:")
            .addFields({name:"**Geburtstagskind**", value:"<@&888937770435878922>: ist die Rolle, die Geburtstagskinder für ihren besonderen Tag haben werden. Die Rolle wird über den Birthday-Bot vergeben."})
            .addFields({name:"**Designer**", value:"<@&703255772489842849>: Nutzerinnen und Nutzer mit dieser Rolle lassen den Server gut aussehen. Sie kümmern sich um die Serverbanner und Serverbilder."})
            .addFields({name:"**Synchronsprecher**", value:"<@&896786172490170409>: Nutzerinnen und Nutzer mit dieser Rolle sind Synchronsprecher/-in – wer hätte das gedacht?"})
            .addFields({name:"**Content Creator**", value:"<@&610538464005455883>: Anhand dieser Rolle kann man die “Content Creator” auf SlyverWorld erkennen."})
            .addFields({name:"**Event-Gewinner**", value:"<@&898582566175666270>: Diese Person hat eines der Serverevents gewonnen."})
            .addFields({name:"**Serverpartner**", value:"<@&847216616671543326>: Jemand, der diese Rolle besitzt, hat selbst einen Server, der eine Partnerschaft mit SlyverWorld eingegangen ist."});
        interaction.reply({ embeds: [embed, embed2, embed3, embed4, embed6], ephemeral: true});
    }
};