const discord = require('discord.js');
const { Message } = require('discord.js');
const QuSchema = require('../../../schemas/QuSchema');

module.exports = {
    structure: {
        name: 'role',
        description: 'Give a user a role. (mention)',
        aliases: ['r']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {

        //kann nict benutzt werden und sie sollen bitte die slashcommand version benutzen
        const embed = new discord.EmbedBuilder()
            .setColor('#F25757')
            .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **This command is currently not available. Please use the slash command version. /role**`);
        message.channel.send({ embeds: [embed] });

        /*
        if (!message.member.permissions.has('ManageRoles')) {
            const embed = new discord.EmbedBuilder()
                .setColor('#F25757')
                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
            message.channel.send({ embeds: [embed] });
            return;
        }

        const member = message.mentions.members.first();
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === args.slice(1).join(' ').toLowerCase());
        const teamroles = ["admin", "supporter", "moderator", "developer", "senior moderator", "event-Leitung","event-Team","staff"]
        if(!teamroles.includes(role)) {
            if (!member) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (!role) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Role not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (member.roles.cache.has(role.id)) {
                //entferne die rolle wieder
                member.roles.remove(role);
                const embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been removed from the role ${role.name}.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (message.member.roles.highest.comparePositionTo(role) < 0) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to give this role to the user.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            member.roles.add(role);
            const embed = new discord.EmbedBuilder()
                .setColor('#57F287')
                .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been given the role ${role.name}.**`);
            message.channel.send({ embeds: [embed] });
        }else if(message.member.roles.cache.has('1013898642429595748')) { //point role1
            if (!member) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (!role) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Role not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (member.roles.cache.has(role.id)) {
                //entferne die rolle wieder
                member.roles.remove(role);
                const embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been removed from the role ${role.name}.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            //überprüfe ob role über dem user steht
            if (message.member.roles.highest.comparePositionTo(role) < 0) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to give this role to the user.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            member.roles.add(role);
            const embed = new discord.EmbedBuilder()
                .setColor('#57F287')
                .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been given the role ${role.name}.**`);
            message.channel.send({ embeds: [embed] });
            return;
        } else if(message.member.roles.cache.has('1132708316297052281')) { //point role2
            if (!member) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (!role) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Role not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (member.roles.cache.has(role.id)) {
                //entferne die rolle wieder
                member.roles.remove(role);
                const embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been removed from the role ${role.name}.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            //überprüfe ob role über dem user steht
            if (message.member.roles.highest.comparePositionTo(role) < 0) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to give this role to the user.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            member.roles.add(role);
            const embed = new discord.EmbedBuilder()
                .setColor('#57F287')
                .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been given the role ${role.name}.**`);
            message.channel.send({ embeds: [embed] });
            return;
        } else if (message.member.roles.cache.has('974742920664055828')){ //dev
            if (!member) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (!role) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Role not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (member.roles.cache.has(role.id)) {
                //entferne die rolle wieder
                member.roles.remove(role);
                const embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been removed from the role ${role.name}.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            member.roles.add(role);
            const embed = new discord.EmbedBuilder()
                .setColor('#57F287')
                .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been given the role ${role.name}.**`);
            message.channel.send({ embeds: [embed] });
            return;
        }else {
            const roles = message.member.roles.cache.map(role => role.id);
            console.log(roles);
            //zur mongo datenbank hinzufügen;
            const embed = new discord.EmbedBuilder()
                .setColor('#F25757')
                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **For security reasons, this role could not be assigned.**`);
            message.channel.send({ embeds: [embed] });
            return;
        }
        */   
        
    }
       
};
