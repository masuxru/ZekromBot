const { ButtonInteraction } = require('discord.js');
const discord = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'report1',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        //reply with meesssage dein ticket würd geöffnet
        interaction.reply({ content: 'Dein Ticket wird geöffnet...', ephemeral: true });
        //wenn der user eine bestimmte rolle hat reply mit du darfst kein ticket öffnen
        if (interaction.member.roles.cache.has('927240719524036658')) {
            interaction.reply({ content: 'Du darfst dieses nicht Ticket öffnen!', ephemeral: true });
            return;
        }
        //erstelle in einer betimmten category ein ticket und sendet eine nachricht in den channel
        const channel = await interaction.guild.channels.create({
            name: `report-${interaction.user.username}`,
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
                    id: '1008432117660778588',
                    allow: ['ViewChannel'],
                },
            ],
        });
        //sendet eine nachricht in den channel
        const embed = new discord.EmbedBuilder()
            .setTitle('**Report**')
            .setDescription('Bitte beschreibe dein Problem möglichst genau, damit wir dir schnell helfen können.')
            //farbe rot
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
        channel.send({content: `<@${interaction.user.id}>, <@&791355452063350785>, <@&601132986611793930>` ,embeds: [embed], components: [{type: 1, components: [button, button2, button3]}]});
        

    }
};