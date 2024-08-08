const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const afkschema = require('../../../schemas/AFKSchema');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('set urself afk')
        .addStringOption((opt) =>
            opt.setName('reason')
                .setDescription('Reason for being afk')
                .setRequired(false)
        ),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const reason = interaction.options.getString('reason');
        const afk = await afkschema.findOne({ userId: interaction.user.id });
        if (afk) {
            await afkschema.findOneAndDelete({ userId: interaction.user.id });
            return interaction.reply({ content: 'I removed your afk', ephemeral: true });
        }
        await afkschema.create({
            userId: interaction.user.id,
            reason: reason ?? 'No reason provided'
        });
        return interaction.reply({ content: 'You are now afk', ephemeral: true });
    }
};