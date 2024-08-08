const config = require('../../../config');
const discord = require('discord.js');
const { Message } = require('discord.js');
const warnSchema = require('../../../schemas/WarnSchema');



module.exports = {
    structure: {
        name: 'delete-warnings',
        description: '``-delete-warnings userID`` bei userID bitte die ID des Benutzers eintragen.',
        aliases: ['dw']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {

let member = null;
let embed = null;

        switch(true)   {
            //staff case
            case message.member.roles.cache.has('1008432117660778588'):
                    member = message.guild.members.cache.find(member => member.id === args[0]);
                if (!member) {
                        embed = new discord.EmbedBuilder()
                        .setColor('#FF0000')
                        .setDescription(`<a:swemote:1121914828664094731> **Please mention a user.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }
               
                //lösche den user aus der datenbank
                warnSchema.findOneAndDelete({ userId: member.user.id }).then(data => {
                    if (data) {
                            embed = new discord.EmbedBuilder()
                            .setColor('#57F287')
                            .setDescription(`<a:sw_emote_checkMark:863402580083212332> **Successfully deleted all warnings of ${member.user.tag}.**`);
                        message.channel.send({ embeds: [embed] });
                    } else {
                            embed = new discord.EmbedBuilder()
                            .setColor('#FF0000')
                            .setDescription(`<a:swemote:1121914828664094731> **This user has no warnings.**`);
                        message.channel.send({ embeds: [embed] });
                    }
                });
                break;

            case message.member.permissions.has('Administrator'):
                    member = message.guild.members.cache.find(member => member.id === args[0]);
                if (!member) {
                embed = new discord.EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`<a:swemote:1121914828664094731> **Please mention a user.**`);
                message.channel.send({ embeds: [embed] });
                return;
                }
                //lösche den user aus der datenbank
                warnSchema.findOneAndDelete({ userId: member.user.id }).then(data => {
                if (data) {
                    embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **Successfully deleted all warnings of ${member.user.tag}.**`);
                message.channel.send({ embeds: [embed] });
                } else {
                    embed = new discord.EmbedBuilder()
                    .setColor('#FF0000')
                    .setDescription(`<a:swemote:1121914828664094731> **This user has no warnings.**`);
                message.channel.send({ embeds: [embed] });
                }}); 
                break;

            default:
                    embed = new discord.EmbedBuilder()
                    .setColor('#FF0000')
                    .setDescription(`<a:swemote:1121914828664094731> **You don't have permission to use this command.**`);
                message.channel.send({ embeds: [embed] });
                return;
        }
    }
};