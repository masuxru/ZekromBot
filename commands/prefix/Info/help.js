const { Message, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const GuildSchema = require('../../../schemas/GuildSchema');

module.exports = {
    structure: {
        name: 'help',
        description: 'View all the possible commands!',
        aliases: ['h']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {

        let prefix = config.handler.prefix;

        if (config.handler?.mongodb?.toggle) {
            try {
                const data = (await GuildSchema.findOne({ guild: message.guildId }));

                if (data && data?.prefix) prefix = data.prefix;
            } catch {
                prefix = config.handler.prefix;
            };
        };

        const mapIntCmds = client.applicationcommandsArray.map((v) => `\`${(v.type === 2 || v.type === 3) ? '' : '/'}${v.name}\`: ${v.description || '(No description)'}`);
        const mapPreCmds = client.collection.prefixcommands.map((v) => `\`${prefix}${v.structure.name}\` (${v.structure.aliases.length > 0 ? v.structure.aliases.map((a) => `**${a}**`).join(', ') : 'None'}): ${v.structure.description || '(No description)'}`);

        const helpEmbed = new EmbedBuilder()
            .setTitle('Hilfe')
            .setDescription('Hier sind alle verfügbaren Slash Befehle:')
            .addFields({name:'Slash-Befehle', value: mapIntCmds.join('\n')})
            .setColor('#992D22');

        if (mapPreCmds.length > 1020) {
            const firstHalf = mapPreCmds.slice(0, mapPreCmds.length / 500);
            const secondHalf = mapPreCmds.slice(mapPreCmds.length / 2);
            console.log(firstHalf.length, secondHalf.length);

            const helpEmbed2 = new EmbedBuilder()
                .setTitle('Hilfe (Fortsetzung)')
                .setDescription('Hier sind weitere verfügbare Befehle:')
                .addFields({name:'Prefix-Befehle (1/2)', value: firstHalf.join('\n')})
                .setColor('#992D22');

            const helpEmbed3 = new EmbedBuilder()
                .addFields({name:'Prefix-Befehle (2/2)', value: secondHalf.join('\n')})
                .setColor('#992D22');

            await message.reply({ embeds: [helpEmbed, helpEmbed2, helpEmbed3] });
        } else {
            const helpEmbed2 = new EmbedBuilder()
                .setTitle('Hilfe (Fortsetzung)')
                .setDescription('Hier sind weitere verfügbare Befehle:')
                .addFields({name:'Prefix-Befehle', value: mapPreCmds.join('\n')})
                .setColor('#992D22');

            await message.reply({ embeds: [helpEmbed, helpEmbed2] });
        }
    }
};
