const config = require('../../config');
const { log } = require('../../functions');
const ExtendedClient = require('../../class/ExtendedClient');
const BanSchema = require('../../schemas/BanSchema');
const QuSchema = require('../../schemas/QuSchema');

module.exports = {
    event: 'guildMemberAdd',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {import('discord.js').Interaction} interaction 
     * @returns 
     */
    run: (client, member, interaction) => {
      //ban and qu sticky
      BanSchema.findOne({ userId: member.user.id }).then(data => {
        if (data) {
          //give user the ban role
          const role = member.guild.roles.cache.find(role => role.id === "927240719524036658");
          member.roles.add(role);
          return;
        }else{
          console.log(`member ${member.user.tag} is free ban`)
        }
      });
      QuSchema.findOne({ userId: member.user.id }).then(data => {
        if (data) {
          //give user the qu role
          const role = member.guild.roles.cache.find(role => role.id === "1126992460569129050");
          member.roles.add(role);
          return;
        }else{
          console.log(`member ${member.user.tag} is free qu`)
        }
      });
        //geh in den chat channel und schick eine nachricht
        const channel = member.guild.channels.cache.find(ch => ch.id === '1094697571471085678');
        if (!channel) return;
        channel.send(`${member}**, willkommen auf SlyverWorld!**<a:sw_emote_kuromii_love:1122216000394379327>`);
    }
};