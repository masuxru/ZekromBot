const { ChannelType, Message, EmbedBuilder } = require('discord.js');
const config = require('../../config');
const { log } = require('../../functions');
const GuildSchema = require('../../schemas/GuildSchema');
const ExtendedClient = require('../../class/ExtendedClient');
const afkSchema = require('../../schemas/AFKSchema');
const HalloweenEventSchema = require('../../schemas/HalloweenEventSchema');

module.exports = {
    event: 'messageCreate',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @returns 
     */
    run: async (client, message) => {
        if (message.author.bot || message.channel.type === ChannelType.DM) return;

        
        const halloweenEvent = await HalloweenEventSchema.findOne({ userId: message.author.id });
        if (halloweenEvent) {
            // Check if 60 minutes have passed since last message
            const lastMessageTime = halloweenEvent.lastMessageTime;
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - lastMessageTime;
            const minutesPassed = Math.floor(timeDifference / 60000);
            if (minutesPassed >= 1) {
                // Update lastMessageTime and messageCount
                await HalloweenEventSchema.findOneAndUpdate({ userId: message.author.id }, { lastMessageTime: currentTime, $inc: { points: 5 } });
                await message.reply('Du hast 5 Punkte für das Halloween Event erhalten. <a:sw_anime_girlExcited:862452969211428894>');
            }
        }


        if (message.mentions.members.first()) {
            const afk = await afkSchema.findOne({ userId: message.mentions.members.first().id });
            if (afk) {
                const em = new EmbedBuilder()
                    .setDescription(`${message.mentions.members.first().user.username} is afk for ${afk.reason}`)
                    //color green
                    .setColor('#57F287')
                message.reply({ embeds: [em] });
            }
        }
        if (message.mentions.repliedUser) {
            const afk = await afkSchema.findOne({ userId: message.mentions.repliedUser.id });
            if (afk) {
                const em = new EmbedBuilder()
                    .setDescription(`${message.mentions.repliedUser.tag} is afk for ${afk.reason}`)
                    //color green
                    .setColor('#57F287')
                message.reply({ embeds: [em] });

            }
        }
        if (message.content) {
            const afk = await afkSchema.findOne({ userId: message.author.id });
            if (afk) {
                await afkSchema.findOneAndDelete({ userId: message.author.id });
                message.reply({ content: `Welcome back ${message.author.tag}, I removed your afk <:sw_anime_kannaheart:1118881128628101120>` });
            }
            
        }

        if (!config.handler.commands.prefix) return;

        let prefix = config.handler.prefix || process.env.PREFIX;

        if (config.handler?.mongodb?.toggle) {
            try {
                const guildData = await GuildSchema.findOne({ guild: message.guildId });

                if (guildData && guildData?.prefix) prefix = guildData.prefix;
            } catch {
                prefix = config.handler.prefix;
            };
        };

        if (!message.content.startsWith(prefix)) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const commandInput = args.shift().toLowerCase();

        if (!commandInput.length) return;

        let command = client.collection.prefixcommands.get(commandInput) || client.collection.prefixcommands.get(client.collection.aliases.get(commandInput));

        if (command) {
            try {
                if (command.structure?.permissions && !message.member.permissions.has(command.structure?.permissions)) {
                    await message.reply({
                        content: 'You do not have the permission to use this command.'
                    });

                    return;
                };

                command.run(client, message, args);
            } catch (error) {
                log(error, 'err');
            }
        }
    },
};
