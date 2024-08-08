const { ButtonInteraction } = require('discord.js');
const discord = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const ModlogsSchema = require('../../schemas/ModstatsSchema');

module.exports = {
    customId: 'claim',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        // check ob der user eine bistimme rolle oder brechtigung hat
        if (!interaction.member.roles.cache.has('1008432117660778588' || '1013898642429595748' || '1132708316297052281' || '918742480227282954' || '1123934811338330112')) {
            interaction.reply({content:`<@${interaction.user.id}>Du hast keine Berechtigung um dieses Ticket zu claimen.`, ephemeral: true});
            return;
        }
        //erstelle ein claim embed und sendet es in den channel
        const embed = new discord.EmbedBuilder()
            .setTitle('**Claim**')
            //dieses ticket wurde geclaimed von interaction.user.username
            .setDescription('Dieses Ticket wurde geclaimed von ' + interaction.user.username + '.')
            .setColor('#2ECC71');
        //finde den author der nachricht gucke ob er in der datenbank ist wenn ja BanCount +1 wenn nein erstelle einen neuen eintrag
        
        const data = await ModlogsSchema.findOne({ userId: interaction.user.id });
        if (data) {
            data.ClaimedCount++;
            data.save();
        }else if(!data) {
            new ModlogsSchema({
                userId: interaction.author.id,
                BanCount: 0,
                WarnCount: 0,
                ClaimedCount: 1,
            }).save();
        }
        
        //claim button disabled
        const button = new discord.ButtonBuilder()
            .setCustomId('claim')
            .setLabel('Claim')
            .setStyle('3')
            .setDisabled(true);
        //ein button der das ticket schließt
        const button2 = new discord.ButtonBuilder()
            .setCustomId('close')
            .setLabel('Close')
            .setStyle('4');
        const button3 = new discord.ButtonBuilder()
            .setCustomId('transcript')
            .setLabel('Transcript')
            .setStyle('1');
        //edit mesage and disable claim button
        interaction.message.edit({ embeds: [embed], components: [{ type: 1, components: [button, button2, button3] }] });
        //interaction.reply({content:`<@${interaction.user.id}>`, embeds: [embed]});
        return;
    }
};