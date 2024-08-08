const config = require('../../../config');
const discord = require('discord.js');
const { Message, EmbedBuilder } = require('discord.js');
const BanSchema = require('../../../schemas/BanSchema');
const ModlogsSchema = require('../../../schemas/ModstatsSchema');

module.exports = {
    structure: {
        name: 'ban',
        //mache die description mit mehr informationen über die funktion
        description: '``-ban userID`` bei userID bitte die ID des Benutzers eintragen.',
        aliases: ['b']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {

        let embed = null;
        let reason = null;
        let role = null;
        let data1 = null;
        let data = null;
        let member = null;

        switch(true){
            case message.member.permissions.has('ManageRoles'):
                reason = args.slice(1).join(' ');
                if (!reason) reason = 'No reason provided.';

                role = message.mentions.members.first() || message.guild.roles.cache.find(role => role.id === "927240719524036658");
                member = message.guild.members.cache.find(member => member.id === args[0]);
                
                if (message.member.roles.cache.has('791355452063350785')) { // sup
                    embed = new discord.EmbedBuilder()
                        .setColor('#F25757')
                        .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }

                if (!member) {
                    embed = new discord.EmbedBuilder()
                        .setColor('#F25757')
                        .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }
                
                member.roles.add(role);
                embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been banned.**`);
                message.channel.send({ embeds: [embed] });

                // Find the author of the message, check if they are in the database, and update BanCount
                data = await ModlogsSchema.findOne({ userId: message.author.id });
                if (data) {
                    data.BanCount++;
                    data.save();
                } else {
                    new ModlogsSchema({
                        userId: message.author.id,
                        BanCount: 1,
                        WarnCount: 0,
                        ClaimedCount: 0,
                    }).save();
                }

                // Write data to the MongoDB database
                data1 = await BanSchema.findOne({ userId: member.user.id });
                if (data1) {
                    data1.banCount++;
                    data1.save();
                } else {
                    new BanSchema({
                        userId: member.user.id,
                        reason: reason,
                    }).save();
                }
                break;
            
            case message.member.permissions.has('Administrator'):
                reason = args.slice(1).join(' ');
                if (!reason) reason = 'No reason provided.';
                
                if (message.member.roles.cache.has('791355452063350785')) { // sup role
                    embed = new discord.EmbedBuilder()
                        .setColor('#F25757')
                        .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }

                role = message.mentions.members.first() || message.guild.roles.cache.find(role => role.id === "927240719524036658");
                member = message.guild.members.cache.find(member => member.id === args[0]);
                
                if (!member) {
                    embed = new discord.EmbedBuilder()
                        .setColor('#F25757')
                        .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }
                
                member.roles.add(role);
                embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been banned.**`);
                message.channel.send({ embeds: [embed] });

                // Find the author of the message, check if they are in the database, and update BanCount
                data = await ModlogsSchema.findOne({ userId: message.author.id });
                if (data) {
                    data.BanCount++;
                    data.save();
                } else {
                    new ModlogsSchema({
                        userId: message.author.id,
                        BanCount: 1,
                        WarnCount: 0,
                        ClaimedCount: 0,
                    }).save();
                }

                // Write data to the MongoDB database
                data1 = await BanSchema.findOne({ userId: member.user.id });
                if (data1) {
                    data1.banCount++;
                    data1.save();
                } else {
                    new BanSchema({
                        userId: member.user.id,
                        reason: reason,
                    }).save();
                }
                break;

                default:
                embed = new discord.EmbedBuilder()
                .setColor('#F25757')
                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                message.channel.send({ embeds: [embed] });
                break;
        }
        }

    }