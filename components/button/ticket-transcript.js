const { ButtonInteraction } = require('discord.js');
const discord = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'transcript',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        //wenn der ticket opener in der db steht return
        const attachment = await discordTranscripts.createTranscript(interaction.channel);
        const embed = new discord.EmbedBuilder()
            .setTitle('**Transcript**')
            .setDescription('Hier ist dein Transcript.')
            .setColor('#FF0000');
        interaction.reply({embeds: [embed], files: [attachment]});
    }
};