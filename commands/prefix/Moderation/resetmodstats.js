const { Message, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const modstatsSchema = require('../../../schemas/ModstatsSchema');

module.exports = {
    structure: {
        name: 'resetmodstats',
        description: '``-resetmodstats userID`` bei userID bitte die ID des Benutzers eintragen.',
        aliases: ['rs']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        if(!message.member.permissions.has('Administrator')) return message.channel.send('You do not have permission to use this command.')
        const userId = args[0];
        if (!userId) {
            return message.channel.send('Please provide a user ID to reset their mod stats.');
        }

        try {
            const member = message.guild.members.cache.find(member => member.id === args[0]);
            const result = modstatsSchema.findOneAndDelete({ userId: member.id });

            if (!result) {
                return message.channel.send(`No mod stats found for user ${member.tag}.`);
            }

            message.channel.send(`Mod stats for user ${member.tag} have been reset.`);
        } catch (error) {
            console.error(error);
            message.channel.send('An error occurred while resetting mod stats.');
        }
    }

};