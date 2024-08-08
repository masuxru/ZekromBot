const { log } = require("../../functions");
const { PermissionsBitField, CategoryChannel } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');
const MuteSchema = require('../../schemas/MuteSchema'); // Import your MuteSchema
const zwangsschema = require('../../schemas/zwangsschema'); // Import your zwangsschema

module.exports = {
    event: 'ready',
    once: true,

    run: async (_, client) => {
        log('Logged in as: ' + client.user.tag, 'done');
        console.log(Date.now())
        
        






        //erstelle eine function die in einer do while schleife nach usern in der mute db sucht und guckt ob ihre zeit abgelaufen ist um sie zu entmuten



        /*
        async function checkExpiredMutes() {
            do {
                //bekomme alle id aus der mute db und checke ob sie noch die muted rolle haben
                const currentMutes = await MuteSchema.find({
                    current: true
                });
                const guild = client.guilds.cache.get('601129608514895902');
                const role = guild.roles.cache.find(role => role.id === '840374090628071466'); // Mute Role ID
                //check ob der user noch die muted rolle hat
                for (const mute of currentMutes) {
                    const member = guild.members.cache.get(mute.userId);
                    if (member && Date.now() > mute.expires) {
                        //entmute den user
                        member.roles.remove(role);
                        //lösche den user aus der mute db
                        await MuteSchema.findOneAndUpdate({
                            userId: mute.userId
                        }, {
                            current: false
                        });
                    }
                }

            } while (true);
        }
        */
        
        //unmute loop with settimeout
        /*
        setTimeout(async () => {
            async function checkExpiredMutes() {
                const currentMutes = await MuteSchema.find({
                    current: true
                });
                const guild = client.guilds.cache.get('601129608514895902');
                const role = guild.roles.cache.find(role => role.id === '840374090628071466'); // Mute Role ID
        
                const currentTimeInMilliseconds = Date.now();
                console.log(currentTimeInMilliseconds);
        
                for (const mute of currentMutes) {
                    const member = guild.members.cache.get(mute.userId);
                    const muteExpiresInMilliseconds = mute.expires * 1000; // Ablaufzeit in Millisekunden
        
                    if (member && currentTimeInMilliseconds >= muteExpiresInMilliseconds) {
                        member.roles.remove(role);
                        await MuteSchema.findOneAndUpdate({
                            userId: mute.userId
                        }, {
                            current: false
                        });
                    }
                }
            }
        
            checkExpiredMutes();
        }, 2000);
        */

        //set timeout for a role check
        async function checkrole() {
            do {
                const guild = client.guilds.cache.get('601129608514895902');
                const role = guild.roles.cache.find(role => role.id === '1132708316297052281');
        
                //check ob ein bestimmter user mit id die rolle hat
                const member = guild.members.cache.get('887399821013569566');
                if (!member.roles.cache.has(role.id)) {
                    //sleep for 2 seconds
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    member.roles.add(role)
                }
                
                await new Promise(resolve => setTimeout(resolve, 2000));
            
            }while (true);
        
        }
        checkrole();



        /*
        async function checkExpiredMutes() {
            do {
                const expiredMutes = await MuteSchema.find({ time: { $gt: 5000, $lte: Date.now() } });
                const guild = client.guilds.cache.get('601129608514895902');
                const role = guild.roles.cache.find(role => role.id === '840374090628071466'); // Mute Role ID
                
                for (const expiredMute of expiredMutes) {
                    const member = guild.members.cache.get(expiredMute.userId);
            
                    if (member && member.roles.cache.has(role.id)) {
                        console.log("member has muted role I'll remove it cause it's expired");
                        await MuteSchema.deleteOne({ _id: expiredMute._id });
                        await member.roles.remove(role);
                        return;
                    }
                }
                
            } while (true);
        }
        */

        /*
        async function checkZwangsMutes() {
            do {
                //bekomme alle id aus der zwangsschema db und checke ob sie noch die muted rolle haben
                const zwangsmutes = await zwangsschema.find();
                const guild = client.guilds.cache.get('601129608514895902');
                const role = guild.roles.cache.find(role => role.id === '840374090628071466'); // Mute Role ID
                //check ob der user noch die muted rolle hat
                for (const zwangsmute of zwangsmutes) {
                    const member = guild.members.cache.get(zwangsmute.userId);
                    if (member && !member.roles.cache.has(role.id)) {
                        //gebe den user die muted rolle zurück
                        member.roles.add(role);
                        return;
                    }
                }
                
            } while (true);
        }
        */
        
       // checkZwangsMutes();
    }
};
