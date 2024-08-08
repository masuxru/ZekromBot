const config = require('../../../config');
const discord = require('discord.js');
const { Message } = require('discord.js');
const WarnSchema = require('../../../schemas/WarnSchema');
const ModlogsSchema = require('../../../schemas/ModstatsSchema');
const ModstatsSchema = require('../../../schemas/ModstatsSchema');


module.exports = {
    structure: {
        name: 'warn',
        description: '``-warn userID reason`` bei userID bitte die ID des Benutzers eintragen.',
        aliases: ['wa']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        let member = null;
        let reason = null;
        let data1 = null;
        let embed = null;

        switch(true)   {
            //staff case
        case message.member.roles.cache.has('1008432117660778588'):
            member = message.guild.members.cache.find(member => member.id === args[0]);
            if (!member) {
            const embed = new discord.EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`<a:swemote:1121914828664094731> **Please mention a user.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
        
            reason = args.slice(1).join(' ');
            if (!reason) {
            embed = new discord.EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`<a:swemote:1121914828664094731> **Please provide a reason.**`);
            message.channel.send({ embeds: [embed] });
            return;
            }
            //finde den author der nachricht gucke ob er in der datenbank ist wenn ja BanCount +1 wenn nein erstelle einen neuen eintrag
            data1 = await WarnSchema.findOne({ userId: member.user.id })
            if (data1) {
                data1.reasoncount++;
                data1.reason.push(reason);
                data1.save();
            } else {
                new WarnSchema({
                userId: member.user.id,
                reasoncount: 1,
                reason: [reason],
            }).save();
            }
            ModlogsSchema.findOne({ userId: message.author.id }).then(data => {
                if (data) {
                    data.WarnCount++;
                    data.save();
                } else {
                new ModlogsSchema({
                    userId: message.author.id,
                    BanCount: 0,
                    WarnCount: 1,
                    ClaimedCount: 0,
                }).save();
            }
            });
        
            embed = new discord.EmbedBuilder()
            .setColor('#57F287')
            .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user.username} has been warned.**`);
            message.channel.send({ embeds: [embed] });
            member.send(`You have been warned in ${message.guild.name} for ${reason}`);
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
        
            reason = args.slice(1).join(' ');
            if (!reason) {
            embed = new discord.EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(`<a:swemote:1121914828664094731> **Please provide a reason.**`);
            message.channel.send({ embeds: [embed] });
            return;
            }
            //finde den author der nachricht gucke ob er in der datenbank ist wenn ja BanCount +1 wenn nein erstelle einen neuen eintrag
            data1 = await WarnSchema.findOne({ userId: member.user.id })
            if (data1) {
                data1.reasoncount++;
                data1.reason.push(reason);
                data1.save();
            } else {
            new WarnSchema({
                userId: member.user.id,
                reasoncount: 1,
                reason: [reason],
                }).save();
            }
            ModlogsSchema.findOne({ userId: message.author.id }).then(data => {
                if (data) {
                    data.WarnCount++;
                    data.save();
                } else {
                    new ModlogsSchema({
                    userId: message.author.id,
                    BanCount: 0,
                    WarnCount: 1,
                    ClaimedCount: 0,
                }).save();
                }
            });
        
            embed = new discord.EmbedBuilder()
            .setColor('#57F287')
            .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user.username} has been warned.**`);
            message.channel.send({ embeds: [embed] });
            member.send(`You have been warned in ${message.guild.name} for ${reason}`);
            break;


        default:
            embed = new discord.EmbedBuilder()
            .setColor('#F25757')
            .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
            message.channel.send({ embeds: [embed] });
            break;




            
        }







    }
};