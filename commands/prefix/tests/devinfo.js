const config = require('../../../config');
const discord = require('discord.js');
const { Message, EmbedBuilder} = require('discord.js');

module.exports = {
    structure: {
        name: 'info',
        description: 'Dieser Command ist ein Embed und nur für den Bot-Token-Eigentümer zugänglich',
        aliases: ['i']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        if (message.author.id !== '887399821013569566') return message.channel.send('Du bist nicht der Bot-Owner!');
        message.delete();
        //wenn der
        //die buttons
        const button1 = new discord.ButtonBuilder()
            .setLabel('Regeln')
            .setStyle('1')
            .setCustomId('rules1');
        const button2 = new discord.ButtonBuilder()
            .setLabel('Warns')
            .setStyle('1')
            .setCustomId('warns2');
        const button3 = new discord.ButtonBuilder()
            .setLabel('Team-Liste')
            .setStyle('1')
            .setCustomId('team3');
        const button4 = new discord.ButtonBuilder()
            .setLabel('Rangliste')
            .setStyle('1')
            .setCustomId('rank4');
        const button5 = new discord.ButtonBuilder()
            .setLabel('Abmeldungen')
            .setStyle('Link')
            .setURL('https://docs.google.com/spreadsheets/d/1PiyFWZ4EMlIU_hqoBRa1CaiNe9DXFzudNoGZq0CTvuw/edit#gid=1767423063')
        const embed = new discord.EmbedBuilder()
            .setColor('#9B59B6')
            .setTitle('**Herzlich Willkommen im Info-Center!**')
            .setImage("https://cdn.discordapp.com/attachments/1037671361629405214/1074393851483131974/J8w2GMH.jpeg")
            .setDescription(`Hier findest du folgendes:\n- Team-Regeln\n- Team-Warns\n- Team-List\- Rank-List\n\n> Um mehr Informationen zu erhalten, trete bitte dem Info-Center bei.\n\nInvite-Link:\n[hier](https://discord.gg/spjTtTb5av)`)
        message.channel.send({ embeds: [embed], components: [{type: 1, components: [button1, button2, button3, button4, button5]}] });
    }

};