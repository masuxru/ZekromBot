const { Message, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');
const config = require('../../../config');
const modstatsSchema = require('../../../schemas/ModstatsSchema');

module.exports = {
    structure: {
        name: 'modstats',
        description: '``-modstats userID`` bei userID bitte die ID des Benutzers eintragen.',
        aliases: ['s']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {

let member = null;
let embed = null;

        switch (true) {
            case message.member.roles.cache.has('1008432117660778588'):
                member = message.guild.members.cache.find(member => member.id === args[0]);
                if (!member) {
                embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`<a:swemote:1121914828664094731> **Please mention a user.**`);
                message.channel.send({ embeds: [embed] });
                return;
                }
                modstatsSchema.findOne({ userId: member.user.id }).then(data => {
                if (data) {
                    console.log(`${data.BanCount} ${data.WarnCount} ${data.ClaimedCount}`)
                    embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setDescription(`<a:swemote:1121914828664094731> **${member.user.username}**\n\n**Bans:** ${data.BanCount}\n\n**Warns:** ${data.WarnCount}\n\n**Claimed Tickets:** ${data.ClaimedCount}`);
                    message.channel.send({ embeds: [embed] });
                } else {
                    embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setDescription(`<a:swemote:1121914828664094731> **${member.user.username} has 0 data**`);
                    message.channel.send({ embeds: [embed] });
                }});
                break;

            case message.member.permissions.has('Administrator'):
                member = message.guild.members.cache.find(member => member.id === args[0]);
                if (!member) {
                embed = new EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`<a:swemote:1121914828664094731> **Please mention a user.**`);
                message.channel.send({ embeds: [embed] });
                return;
                }
                modstatsSchema.findOne({ userId: member.user.id }).then(data => {
                if (data) {
                    console.log(`${data.BanCount} ${data.WarnCount} ${data.ClaimedCount}`)
                    embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setDescription(`<a:swemote:1121914828664094731> **${member.user.username}**\n\n**Bans:** ${data.BanCount}\n\n**Warns:** ${data.WarnCount}\n\n**Claimed Tickets:** ${data.ClaimedCount}`);
                    message.channel.send({ embeds: [embed] });
                } else {
                    embed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setDescription(`<a:swemote:1121914828664094731> **${member.user.username} has 0 data**`);
                    message.channel.send({ embeds: [embed] });
                }}); 
                break;
                
            default:
                    embed = new EmbedBuilder()
                        .setColor('#F25757')
                        .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                    await message.channel.send({ embeds: [embed] });
                    break;
                
            }

        }
    

};