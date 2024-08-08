const { ButtonInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const discord = require('discord.js');

module.exports = {
    customId: 'sponsering4',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        interaction.reply({ content: 'Dein Ticket wird geöffnet...', ephemeral: true });
        if (interaction.member.roles.cache.has('927240719524036658')) {
            interaction.reply({ content: 'Du darfst dieses nicht Ticket öffnen!', ephemeral: true });
            return;
        }
        //wenn die user id in der claim db ist return
        if (Claim.get(interaction.user.id)) return interaction.reply({ content: 'Du hast bereits ein offenes Ticket!', ephemeral: true });
        const channel = await interaction.guild.channels.create({
            name: `sponsoring-${interaction.user.username}`,
            type: 0,
            parent: '829443274979934288',
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['ViewChannel'],
                },
                {
                    id: interaction.user.id,
                    allow: ['ViewChannel', 'SendMessages'],
                },
                {
                    id: '778314696587477002',
                    deny: ['ViewChannel'],
                },
            ],
        });
        //sendet eine nachricht in den channel
        const embed = new discord.EmbedBuilder()
            .setTitle('**Sponsoring**')
            .setDescription('Bitte beschreibe dein Problem möglichst genau, damit wir dir schnell helfen können.')
            .setColor('#FF0000');
        //erstelle einen claim button
        const button = new discord.ButtonBuilder()
            .setCustomId('claim')
            .setLabel('Claim')
            .setStyle('3');
            //ein button der das ticket schließt
        const button2 = new discord.ButtonBuilder()
            .setCustomId('close')
            .setLabel('Close')
            .setStyle('4');
        const button3 = new discord.ButtonBuilder()
            .setCustomId('transcript')
            .setLabel('Transcript')
            .setStyle('1');
        channel.send({content:`<@${interaction.user.id}>`,embeds: [embed], components: [{type: 1, components: [button,button2, button3]}]});
        
    }
};