const { ButtonInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const discord = require('discord.js');

module.exports = {
    customId: 'entbannungsantrag',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        interaction.reply({ content: 'Dein Ticket wird geöffnet...', ephemeral: true });
        const channel = await interaction.guild.channels.create({
            name: `unban-${interaction.user.username}`,
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
                    id: '601132986611793930',
                    allow: ['ViewChannel'],
                },
                {
                    id: '962054094443388948',
                    allow: ['ViewChannel'],
                }
            ],
        });
        //schreibe die user id und channel id in die uban db
        //sendet eine nachricht in den channel
        const embed = new discord.EmbedBuilder()
            .setTitle('**Entbannungsticket!**')
            .setDescription('**Huhu, hier habt ihr die Chance einen Entbannungsantrag zu stellen. Folgende Punkte solltet ihr jedoch beachten:**\n\n> `1.` Schreibt euren Discord Namen + Tag.\n\n> `2.` Schildere uns so gut wie möglich, weswegen du gebannt wurdest.\n\n> `3.` Was hast du aus deinem Verhalten gelernt?\n\n> `4.` Wie kannst du uns versichern, dass das nicht mehr vorkommt?\n\n*Beachte, dass der Antrag ernst gemeint soll. Trolle fliegen direkt.*            ')
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

        channel.send({content:`<@${interaction.user.id}> <@&601132986611793930>, <@&962054094443388948>`,embeds: [embed], components: [{type: 1, components: [button,button2, button3]}]});
        
    }
};