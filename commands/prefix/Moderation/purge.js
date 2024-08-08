const discord = require('discord.js');
const { Message, Permissions } = require('discord.js');

module.exports = {
    structure: {
        name: 'purge',
        description: '``-purge amount`` bei amount bitte die Anzahl der Nachrichten eintragen.',
        aliases: ['pg']
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {


        let amount = null;
        let embed = null;

        switch(true)  {
            //staff case
                case message.member.roles.cache.has('1008432117660778588'):
                    amount = parseInt(args[0]);
                    if (isNaN(amount) || amount <= 0) {
                        // Ungültige oder fehlende Anzahl von Nachrichten
                        embed = new discord.EmbedBuilder()
                            .setColor('#ff0000')
                            .setDescription('<a:sw_emote_arrow_right:1121914814588002455> **provide a valid amount of messages to purge**');
                        message.channel.send({ embeds: [embed] });
                        return;
                    }
                    // Nachrichten löschen
                    await message.channel.bulkDelete(amount);
                    // Erfolgsnachricht senden
                    embed = new discord.EmbedBuilder()
                        .setColor('#00ff00')
                        .setDescription(`<a:sw_emote_checkMark:863402580083212332> **Succesfully ${amount} messages deleted.**`);
                    await message.channel.send({ embeds: [embed] });
                    break;

                    //admin case
                case message.member.permissions.has('Administrator'):
                        amount = parseInt(args[0]);
                        if (isNaN(amount) || amount <= 0) {
                            // Ungültige oder fehlende Anzahl von Nachrichten
                            embed = new discord.EmbedBuilder()
                                .setColor('#ff0000')
                                .setDescription('<a:sw_emote_arrow_right:1121914814588002455> **provide a valid amount of messages to purge**');
                            message.channel.send({ embeds: [embed] });
                            return;
                        }
                        await message.channel.bulkDelete(amount);
                        // Erfolgsnachricht senden
                        embed = new discord.EmbedBuilder()
                        .setColor('#00ff00')
                        .setDescription(`<a:sw_emote_checkMark:863402580083212332> **Succesfully ${amount} messages deleted.**`);
                        await message.channel.send({ embeds: [embed] });
                        break;    

                default:
                        // Benutzer hat nicht die erforderliche Berechtigung
                        embed = new discord.EmbedBuilder()
                            .setColor('#F25757')
                            .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                        await message.channel.send({ embeds: [embed] });
                        break;
                }

                    



        }



    }

