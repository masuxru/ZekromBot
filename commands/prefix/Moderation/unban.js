const config = require('../../../config');
const discord = require('discord.js');
const { Message } = require('discord.js');
const BanSchema = require('../../../schemas/BanSchema');

module.exports = {
    structure: {
        name: 'unban',
        description: '``-unban userID`` bei userID bitte die ID des Benutzers eintragen.',
        aliases: ['ub']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        let embed = null; // Initialisiere die Embed-Variable außerhalb des Switch-Statements
    
        switch(true){
            //case staff rolle
            case message.member.roles.cache.has('1008432117660778588'):
                const BanRole = message.guild.roles.cache.find(role => role.id === "927240719524036658");
                const staffMember = message.guild.members.cache.find(member => member.id === args[0]);
                if (staffMember) {
                    staffMember.roles.remove(BanRole);
                    embed = new discord.EmbedBuilder()
                        .setColor('#57F287')
                        .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${staffMember.user} has been unbanned.**`);
                        message.channel.send({ embeds: [embed] });      
                    //lösche den user aus ban schema
                    const data = BanSchema.findOneAndDelete({ userId: staffMember.user.id })
                    if (!data) {
                        message.channel.send('User not found in database');
                    }
                    
                } else {
                    const embed = new discord.EmbedBuilder()
                        .setColor('#57F287')
                        .setDescription(`<a:sw_emote_checkMark:863402580083212332> **No member found with ID: ${args[0]}*`);
                    message.channel.send({ embeds: [embed] });
                }
            break;


            //case Admin
            case message.member.permissions.has('Administrator'): 
                const BannRole = message.guild.roles.cache.find(role => role.id === "927240719524036658");
                const adminMember = message.guild.members.cache.find(member => member.id === args[0]);
                if (adminMember) {
                    adminMember.roles.remove(BannRole);
                    //lösche den user aus ban schema
                    const data = BanSchema.findOneAndDelete({ userId: adminMember.user.id })
                    if (data) {
                        embed = new discord.EmbedBuilder()
                        .setColor('#57F287')
                        .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${adminMember.user} has been unbanned.**`);

                        message.channel.send({ embeds: [embed] });
                    }else if(!data){
                        message.channel.send('User not found in database');
                    }
                } else {
                    const embed = new discord.EmbedBuilder()
                        .setColor('#57F287')
                        .setDescription(`<a:sw_emote_checkMark:863402580083212332> **No member found with ID: ${args[0]}**`);
                    message.channel.send({ embeds: [embed] });
                }
            //case sup
            case message.member.roles.cache.has('791355452063350785'):
                embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                    message.channel.send({ embeds: [embed] });
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
