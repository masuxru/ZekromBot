const discord = require('discord.js');
const { Message } = require('discord.js');
const HalloweenEventSchema = require('../../../schemas/HalloweenEventSchema');

module.exports = {
    structure: {
        name: 'event',
        description: '-event um am event teil zu nehmen.',
        aliases: []
    },
    /**
     * @param {ExtendedClient} client 
     * @param {Message} message 
     * @param {[String]} args 
     */
    run: async (client, message, args) => {
        const data = await HalloweenEventSchema.findOne({ userId: message.author.id });
        if(data){
            await message.reply('Du nimmst bereits am Event teil. <:sw_anime_happy:800793101806338058>');
        }else{
            await new HalloweenEventSchema({
                userId: message.author.id,
                lastMessageTime: new Date().getTime(),
                points: 0
            }).save();
            await message.reply('Du nimmst nun am Halloween Event teil. <:sw_anime_redsmile:1122232805443764305>');
        }
    }
}
