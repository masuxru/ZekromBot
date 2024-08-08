const config = require('../../../config');
const discord = require('discord.js');
const { Message, EmbedBuilder} = require('discord.js');

module.exports = {
    structure: {
        name: 'ticket',
        description: 'Dieser Command ist ein Embed und nur für den Bot-Token-Eigentümer zugänglich.',
        aliases: ['ti']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        if (message.author.id !== '887399821013569566') return message.channel.send('Du bist nicht der Bot-Owner!');
        message.delete();
        const em = new discord.EmbedBuilder()
            //farbe weiß
            .setColor('#FFFFFF')
            .setTitle('**Hier kannst du ein Ticket erstellen!**')
            .setDescription('**Report:**\n> Hier kannst du einen User melden.\n\n**Booster:**\n> Hier kannst du deine Custom Rolle machen lassen.\n\n**Sonstiges:**\n> Hier kannst du eine allgemeine Frage stellen.\n\n**Sponsoring:**\n> Hier kannst du unseren Server sponsern.\n\n**Bann-Info:**\n> Hier siehst du Informationen zu deinem Bann.\n\n**Entbannung:**\n> Hier kannst du eine Entbannung beantragen.')
            //powered by fam1ne. servers
            //iconurl path image.ico
            .setFooter({ text: 'Powered by SlyverWorld Servers', iconURL: 'https://cdn.discordapp.com/attachments/1096468616507043850/1136766747538636841/image.png'})
            //timestamp
            .setTimestamp()
        //buttons
        const button1 = new discord.ButtonBuilder()
            .setCustomId('report1')
            .setLabel('Report')
            .setStyle(1)
        const button2 = new discord.ButtonBuilder()
            .setCustomId('booster2')
            .setLabel('Booster')
            .setStyle(1)
        const button3 = new discord.ButtonBuilder()
            .setCustomId('sonstiges3')
            .setLabel('Sonstiges')
            .setStyle(1)
        const button4 = new discord.ButtonBuilder()
            .setCustomId('sponsering4')
            .setLabel('Sponsoring')
            .setStyle(1)
        const button5 = new discord.ButtonBuilder()
            .setCustomId('banninfo5')
            .setLabel('Bann-Info')
            .setStyle(1)
        
        const button6 = new discord.ButtonBuilder()
            .setCustomId('entbannungsantrag')
            .setLabel('Entbannungsantrag')
            .setStyle(1)
        /*
        const select = new discord.StringSelectMenuBuilder()
			.setCustomId('select')
			.setPlaceholder('Select a category')
			.addOptions(
				new discord.StringSelectMenuOptionBuilder()
                    .setLabel('Report')
                    .setDescription('Hier kannst du einen User melden.')
                    .setValue('report1'),
				new discord.StringSelectMenuOptionBuilder()
                    .setLabel('Booster')
                    .setDescription('Hier kannst du deine Custom Rolle machen lassen.')
                    .setValue('booster2'), 
				new discord.StringSelectMenuOptionBuilder()
                    .setLabel('Sonstiges')
                    .setDescription('Hier kannst du eine allgemeine Frage stellen.')
                    .setValue('sonstiges3'),
                new discord.StringSelectMenuOptionBuilder()
                    .setLabel('Sponsoring')
                    .setDescription('Hier kannst du eine Sponsering Anfrage stellen.')
                    .setValue('sponsering4'),
                new discord.StringSelectMenuOptionBuilder()
                    .setLabel('Bann-Info')
                    .setDescription('Hier kannst du Informationen über Banns erhalten.')
                    .setValue('banninfo5'),
                new discord.StringSelectMenuOptionBuilder()
                    .setLabel('Entbannungsantrag')
                    .setDescription('Hier kannst du eine Entbannung beantragen.')
                    .setValue('entbannungsantrag'),
			);
        */
        const row = new discord.ActionRowBuilder()
			//.addComponents(select)
            .setComponents(button1, button2, button3, button4, button6)
        //send the embed with the select menu
        message.channel.send({ embeds: [em], components: [row] });


        
    }

    
};