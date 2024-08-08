const discord = require('discord.js');
const { Message } = require('discord.js');
const QuSchema = require('../../../schemas/QuSchema');

module.exports = {
    structure: {
        name: 'uq',
        description: 'Unquarantine a user. (id)',
        aliases: ['q']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        if (message.member.roles.cache.has('1082064851100237844' || '601130947831922741' || '1108030717390241822' || '1125122019156037733')) { 
            return;
        }
        //if (!message.member.roles.cache.has('601130947831922741')) { //Boss
            //return;
        //}
        //if (!message.member.roles.cache.has('1108030717390241822')) { //Direktor
            //return;
        //}
        //if (!message.member.roles.cache.has('1125122019156037733')) { //Head Admin
            //return;
        //}
        const member = message.guild.members.cache.find(member => member.id === args[0]);
        if (!member) {
            const embed = new discord.EmbedBuilder()
                .setColor('#F25757')
                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
            message.channel.send({ embeds: [embed] });
            return;
        }
        //finde den user in der QuSchema datenbank und gebe ihm die rollen zurück
        const roles = await QuSchema.findOne({
            _id: member.user.id
        });
        

        if (!roles) {
            const embed = new discord.EmbedBuilder()
                .setColor('#F25757')
                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User is not quarantined.**`);
            message.channel.send({ embeds: [embed] });
            return;
        }
        member.roles.set(roles);
        //lösche den user aus der QuSchema datenbank
        await QuSchema.findOneAndDelete({
            _id: member.user.id
        });
        const embed = new discord.EmbedBuilder()
            .setColor('#57F287')
            .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been unquarantined.**`);
        message.channel.send({ embeds: [embed] });


    }

}