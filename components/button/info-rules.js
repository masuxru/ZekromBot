const { ButtonInteraction } = require('discord.js');
const discord = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'rules1',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        const embed = new discord.EmbedBuilder()
                .setColor('#9B59B6')
                .setTitle('**Aufgabenbereiche der Teamler**')
                .setThumbnail("https://cdn.discordapp.com/attachments/988173806881341460/988209767895945216/slyverworldlogo.png")
                .addFields({name:"**Supporter:**", value:"`1` Tickets bearbeiten Reports / Fragen, bei anderen, jeweilige Rolle pingen.\n\n`2` **1. Instanz** bei Fragen zu Servern sowie Meldungen ( Tickets ), moderieren in Text- sowie VoiceChannels."})
                .addFields({name:"**Moderator:**", value:"`3` Tickets ( Booster / Customrole, andere Tickets zuerst Supportern überlassen ).\n\n`4`  Zusätzlich Leute bannen sowie Entbannungstickets bearbeiten/Threads erstellen."})
                .addFields({name:"**SrMod:**", value:"`5` Gleich wie mod. Ratschläge an Moderatoren sowie Supportern geben."})
                .addFields({name:"**Admins:**", value:"`6` Geht euch **nichts** an."})
                .setImage("https://cdn.discordapp.com/attachments/988173806881341460/1054060232558518272/20221218_163835.gif")
            interaction.reply({ embeds: [embed], ephemeral: true});
    }
};