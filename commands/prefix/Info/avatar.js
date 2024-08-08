const discord = require('discord.js');
const { Message } = require('discord.js');

module.exports = {
    structure: {
        name: 'avatar',
        description: '``-avatar @user`` bei @user bitte den User erwähnen.``',
        aliases: ['av']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {

        const member = message.mentions.members.first() || message.member;
        const embed = new discord.EmbedBuilder()
            .setTitle(`${member.user.username}'s avatar`)
            .setColor('#7289DA')
            .setImage(member.user.avatarURL({ dynamic: true, size: 4096 }))
        message.channel.send({ embeds: [embed] });
        return;
    }
};