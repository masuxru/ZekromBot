const config = require('../../../config');
const discord = require('discord.js');
const { Message, EmbedBuilder } = require('discord.js');
const MuteSchema = require('../../../schemas/MuteSchema'); // Import the MuteSchema

module.exports = {
    structure: {
        name: 'unmute',
        description: '``-unmute userID`` bei userID bitte die ID des Benutzers eintragen.',
        aliases: ['um']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        if (message.member.roles.cache.has('1008432117660778588' || '1013898642429595748' || '1132708316297052281' || '918742480227282954' || '1123934811338330112')) { // staff
            const role = message.guild.roles.cache.find(role => role.id === '840374090628071466'); 
            const member = message.mentions.members.first() || message.guild.members.cache.find(member => member.id === args[0]);
            
            if (!member) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            
            if (!member.roles.cache.has(role.id)) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **${member.user} is not muted.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            
            member.roles.remove(role);
            const embed = new discord.EmbedBuilder()
                .setColor('#57F287')
                .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been unmuted.**`);
            message.channel.send({ embeds: [embed] });

            // Remove the mute data from MuteSchema
            await MuteSchema.findOneAndDelete({ userId: member.user.id });
        }
    }
};
