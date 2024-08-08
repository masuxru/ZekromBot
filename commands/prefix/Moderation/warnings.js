const config = require('../../../config');
const discord = require('discord.js');
const { Message } = require('discord.js');
const WarnSchema = require('../../../schemas/WarnSchema');


module.exports = {
    structure: {
        name: 'warnings',
        description: '``-warnings userID`` bei userID bitte die ID des Benutzers eintragen.',
        aliases: ['war']
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
                //finde den user in WarnSchema und gucke ob er in der datenbank ist wenn ja sende die anzahl der warns und die grünede wenn nein sende 0
                WarnSchema.findOne({ userId: member.user.id }).then(data => {
                    if (data) {
                            embed = new discord.EmbedBuilder()
                            .setColor('#FF0000')
                            .setDescription(`<a:swemote:1121914828664094731> **${member.user.tag} has ${data.reasoncount} warnings.**\n\n**Reasons:**\n${data.reason}`);
                        message.channel.send({ embeds: [embed] });
                    } else {
                            embed = new discord.EmbedBuilder()
                            .setColor('#FF0000')
                            .setDescription(`<a:swemote:1121914828664094731> **${member.user.tag} has 0 warnings.**`);
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
                //finde den user in WarnSchema und gucke ob er in der datenbank ist wenn ja sende die anzahl der warns und die grünede wenn nein sende 0
                WarnSchema.findOne({ userId: member.user.id }).then(data => {
                if (data) {
                    embed = new discord.EmbedBuilder()
                    .setColor('#FF0000')
                    .setDescription(`<a:swemote:1121914828664094731> **${member.user.tag} has ${data.reasoncount} warnings.**\n\n**Reasons:**\n${data.reason}`);
                message.channel.send({ embeds: [embed] });
                } else {
                        embed = new discord.EmbedBuilder()
                    .setColor('#FF0000')
                    .setDescription(`<a:swemote:1121914828664094731> **${member.user.tag} has 0 warnings.**`);
                message.channel.send({ embeds: [embed] });
                }});
                break;

            default:
                    embed = new discord.EmbedBuilder()
                    .setColor('#FF0000')
                    .setDescription(`<a:swemote:1121914828664094731> **You don't have permission to use this command.**`);
                message.channel.send({ embeds: [embed] });

            }


     
      
        
    }
};



