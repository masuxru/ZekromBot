const config = require('../../../config');
const discord = require('discord.js');
const { Message, EmbedBuilder } = require('discord.js');
const MuteSchema = require('../../../schemas/MuteSchema');

module.exports = {
    structure: {
        name: 'mute',
        description: '``-mute userID time reason`` bei userID bitte die ID des Benutzers eintragen bei time bitte die Zeit angeben und bei reason bitte den Grund angeben',
        aliases: ['m']
    },
    /**
     * @param {ExtendedClient} client
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {


        let muteRole = null;
        let member = null;
        let durationInMs = null;
        let reason = null;
        let embed = null;
        let unitSpecifier = null;
        let durationValue = null;
        let data = null;
        let durationInput = null;
        
            switch (true){
                case message.member.roles.cache.has('1008432117660778588'):
                    muteRole = message.guild.roles.cache.find(role => role.id === '840374090628071466'); // Mute-Rolle-ID

                    member = message.mentions.members.first() || message.guild.members.cache.find(member => member.id === args[0]);
        
                    if (!member) {
                        // Benutzer nicht gefunden
                        embed = new discord.EmbedBuilder()
                            .setColor('#F25757')
                            .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                        message.channel.send({ embeds: [embed] });
                        return;
                    }
        
                    durationInput = args[1];
                    unitSpecifier = durationInput.slice(-1);
        
                    durationInMs;
                    if (unitSpecifier === 'h') {
                        durationValue = parseFloat(durationInput);
                        if (isNaN(durationValue) || durationValue <= 0) {
                            // Unerlaubte oder ungültige Zeitangabe
                            const embed = new discord.EmbedBuilder()
                                .setColor('#F25757')
                                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Falsche Zeit Angabe.**`);
                            message.channel.send({ embeds: [embed] });
                            return;
                        }
                        durationInMs = durationValue * 3600000; // Stunden in Millisekunden umrechnen
                    } else if (unitSpecifier === 'm') {
                        durationValue = parseFloat(durationInput);
                        if (isNaN(durationValue) || durationValue <= 0) {
                            // Unerlaubte oder ungültige Zeitangabe
                            embed = new discord.EmbedBuilder()
                                .setColor('#F25757')
                                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Falsche Zeit Angabe.**`);
                            message.channel.send({ embeds: [embed] });
                            return;
                        }
                        durationInMs = durationValue * 60000; // Minuten in Millisekunden umrechnen
                    } else if (unitSpecifier === 'w') {
                        durationValue = parseFloat(durationInput);
                        if (isNaN(durationValue) || durationValue <= 0) {
                            // Unerlaubte oder ungültige Zeitangabe
                            embed = new discord.EmbedBuilder()
                                .setColor('#F25757')
                                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Falsche Zeit Angabe.**`);
                            message.channel.send({ embeds: [embed] });
                            return;
                        }
                        durationInMs = durationValue * 604800000; // Wochen in Millisekunden umrechnen
                    } else {
                        // Ungültige Zeitangabe
                        embed = new discord.EmbedBuilder()
                            .setColor('#F25757')
                            .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Ungültige Zeitangabe. Verwenden Sie 'h' für Stunden, 'm' für Minuten oder 'w' für Wochen.**`);
                        message.channel.send({ embeds: [embed] });
                        return;
                    }
        
                    reason = args.slice(2).join(' ');
                    if (!reason) {
                        // Grund fehlt
                        embed = new discord.EmbedBuilder()
                            .setColor('#F25757')
                            .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Gib bitte einen Grund an.**`);
                        message.channel.send({ embeds: [embed] });
                        return;
                    }
        
                    member.roles.add(muteRole);
                    embed = new discord.EmbedBuilder()
                        .setColor('#57F287')
                        .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user.tag} wurde stummgeschaltet.**`);
                    message.channel.send({ embeds: [embed] });
        
                    data = await MuteSchema.findOne({ userId: member.user.id });
                    if (data) {
                        data.MuteCount++;
                        data.time = durationInMs;
                        data.reason = reason;
                        data.save();
                    } else {
                        new MuteSchema({
                            userId: member.user.id,
                            time: durationInMs,
                            reason: reason,
                        }).save();
                    }
        
                    setTimeout(async () => {
                        member.roles.remove(muteRole);
                    }, durationInMs);
                    break;


                case message.member.permissions.has('Administrator'):
                    muteRole = message.guild.roles.cache.find(role => role.id === '840374090628071466'); // Mute-Rolle-ID

                    member = message.mentions.members.first() || message.guild.members.cache.find(member => member.id === args[0]);
        
                    if (!member) {
                        // Benutzer nicht gefunden
                        embed = new discord.EmbedBuilder()
                            .setColor('#F25757')
                            .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                        message.channel.send({ embeds: [embed] });
                        return;
                    }
        
                    durationInput = args[1];
                    unitSpecifier = durationInput.slice(-1);
        
                    durationInMs;
                    if (unitSpecifier === 'h') {
                        durationValue = parseFloat(durationInput);
                        if (isNaN(durationValue) || durationValue <= 0) {
                            // Unerlaubte oder ungültige Zeitangabe
                            embed = new discord.EmbedBuilder()
                                .setColor('#F25757')
                                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Falsche Zeit Angabe.**`);
                            message.channel.send({ embeds: [embed] });
                            return;
                        }
                        durationInMs = durationValue * 3600000; // Stunden in Millisekunden umrechnen
                    } else if (unitSpecifier === 'm') {
                        durationValue = parseFloat(durationInput);
                        if (isNaN(durationValue) || durationValue <= 0) {
                            // Unerlaubte oder ungültige Zeitangabe
                            embed = new discord.EmbedBuilder()
                                .setColor('#F25757')
                                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Falsche Zeit Angabe.**`);
                            message.channel.send({ embeds: [embed] });
                            return;
                        }
                        durationInMs = durationValue * 60000; // Minuten in Millisekunden umrechnen
                    } else if (unitSpecifier === 'w') {
                        durationValue = parseFloat(durationInput);
                        if (isNaN(durationValue) || durationValue <= 0) {
                            // Unerlaubte oder ungültige Zeitangabe
                            embed = new discord.EmbedBuilder()
                                .setColor('#F25757')
                                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Falsche Zeit Angabe.**`);
                            message.channel.send({ embeds: [embed] });
                            return;
                        }
                        durationInMs = durationValue * 604800000; // Wochen in Millisekunden umrechnen
                    } else {
                        // Ungültige Zeitangabe
                        embed = new discord.EmbedBuilder()
                            .setColor('#F25757')
                            .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Ungültige Zeitangabe. Verwenden Sie 'h' für Stunden, 'm' für Minuten oder 'w' für Wochen.**`);
                        message.channel.send({ embeds: [embed] });
                        return;
                    }
        
                    reason = args.slice(2).join(' ');
                    if (!reason) {
                        // Grund fehlt
                        embed = new discord.EmbedBuilder()
                            .setColor('#F25757')
                            .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Gib bitte einen Grund an.**`);
                        message.channel.send({ embeds: [embed] });
                        return;
                    }
        
                    member.roles.add(muteRole);
                    embed = new discord.EmbedBuilder()
                        .setColor('#57F287')
                        .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user.tag} wurde stummgeschaltet.**`);
                    message.channel.send({ embeds: [embed] });
        
                    data = await MuteSchema.findOne({ userId: member.user.id });
                    if (data) {
                        data.MuteCount++;
                        data.time = durationInMs;
                        data.reason = reason;
                        data.save();
                    } else {
                        new MuteSchema({
                            userId: member.user.id,
                            time: durationInMs,
                            reason: reason,
                        }).save();
                    }
        
                    setTimeout(async () => {
                        member.roles.remove(muteRole);
                    }, durationInMs);
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
