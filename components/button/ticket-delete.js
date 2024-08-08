const { ButtonInteraction } = require('discord.js');
const discord = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    customId: 'close',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        if (!interaction.member.roles.cache.has('1008432117660778588') || !interaction.member.permissions.has('Administrator')) {
            interaction.reply({content:`<@${interaction.user.id}>`, content: 'Du hast keine Berechtigung um dieses Ticket zu schließen.', ephemeral: true});
        }
        //erstelle ein close embed und sendet es in den channel
        //wartre vor dem löschvorgang 5 sekunden
        //das ticket wird gelöscht in 5 sec
        const embed = new discord.EmbedBuilder()
            .setTitle('**Close**')
            .setDescription('Das Ticket wird in 5 Sekunden gelöscht.')
            .setColor('#FF0000');
        interaction.reply({embeds: [embed]});
        //finde ein channel per id
        const channel = await interaction.guild.channels.fetch('1037671889801322516');
        const attachment = await discordTranscripts.createTranscript(interaction.channel);
        channel.send({content: `${interaction.channel.name}`, files: [attachment]});
        //sende das transcript in den channel
        setTimeout(function () {
            interaction.channel.delete();
        }, 5000);
    }
};