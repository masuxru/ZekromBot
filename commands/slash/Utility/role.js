const { ChatInputCommandInteraction, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const ExtendedClient = require('../../../class/ExtendedClient');

module.exports = {
    structure: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Give a user a role.')
        .addUserOption((opt) =>
            opt.setName('user')
                .setDescription('The user.')
                .setRequired(true),
        )
        .addRoleOption((opt) =>
            opt.setName('role')
                .setDescription('The role.')
                .setRequired(true),
        ),
    /**
     * @param {ExtendedClient} client 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {[]} args 
     */
    run: async (client, interaction, args) => {
        //working
        await interaction.deferReply({ ephemeral: false })
        //check if the user hast admin perms
        const saveroles = ['791355452063350785','601132986611793930','962054094443388948','974742920664055828','778314696587477002','817156176834986034']
        //wenn die rolle in saveroles drin ist darf sie nicht entfernt oder hinzu gefügt werden
        const role = interaction.options.getRole('role');
        const user = interaction.options.getUser('user');
        const member = interaction.guild.members.cache.find(member => member.id === user.id);
        if (!saveroles.includes(role.id)) {
            if(interaction.member.roles.cache.has('974742920664055828')) {
                //wenn der user die rolle hat nehme sie ihm weider weg
                if (member.roles.cache.has(role.id)) {
                    member.roles.remove(role);
                    const embed = new EmbedBuilder()
                        .setColor('#57F287')
                        .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been removed from the role ${role.name}.**`);
                    return await interaction.editReply({ embeds:[embed] });
                }
                //wenn der user die rolle nicht hat gebe sie ihm
                member.roles.add(role);
                const embed = new EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been given the role ${role.name}.**`);
                return await interaction.editReply({ embeds: [embed] });
            
            
            
            
            }else if(interaction.member.permissions.has('ManageRoles')){
                //wenn der user die rolle hat nehme sie ihm weider weg
                if (interaction.member.roles.highest.comparePositionTo(role) < 0) {
                    const embed = new EmbedBuilder()
                        .setColor('#F25757')
                        .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to give this role to the user.**`);
                    return await interaction.editReply({ embeds:[embed] });
                }
                if (member.roles.cache.has(role.id)) {
                    member.roles.remove(role);
                    const embed = new EmbedBuilder()
                        .setColor('#57F287')
                        .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been removed from the role ${role.name}.**`);
                    return await interaction.editReply({ embeds:[embed] });
                }
                //wenn der user die rolle nicht hat gebe sie ihm
                member.roles.add(role);
                const embed = new EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been given the role ${role.name}.**`);
                return await interaction.editReply({ embeds: [embed] });
            }else{
                return await interaction.editReply({ content: 'You cant add or remove this role'});
            }
        }else if(interaction.member.permissions.has('Administrator')) {
            if (interaction.member.roles.highest.comparePositionTo(role) < 0) {
                const embed = new EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to give this role to the user.**`);
                    return await interaction.editReply({ embeds:[embed] });
            }
            //wenn der user die rolle hat nehme sie ihm weider weg
            if (member.roles.cache.has(role.id)) {
                member.roles.remove(role);
                const embed = new EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been removed from the role ${role.name}.**`);
                return await interaction.editReply({ embeds:[embed] });
            }
            //wenn der user die rolle nicht hat gebe sie ihm
            member.roles.add(role);
            const embed = new EmbedBuilder()
                .setColor('#57F287')
                .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been given the role ${role.name}.**`);
            return await interaction.editReply({ embeds: [embed] });
        }else{
            return await interaction.editReply({ content: 'You cant add or remove this role'});
        }
        

    }

};