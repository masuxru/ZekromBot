const discord = require('discord.js');
const axios = require('axios');
const discordTranscripts = require('discord-html-transcripts');
const fs = require('fs');

const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});
//enmap erstellen
const Enmap = require('enmap');
const Ban = new Enmap({ name: 'Ban' });
const modlogsban = new Enmap({ name: 'modlogsban' });
const Unban = new Enmap({ name: 'Unban' });
const qu = new Enmap({ name: 'qu' });
const afk = new Enmap({ name: 'afk' });
const Warn = new Enmap({ name: 'warn' });
const Claim = new Enmap({name: 'claim'});
//prefix
const prefix = '';




client.on('ready', async() => {
    console.log('I am ready!');
    //wir setzen den status auf online und setzen den status text
    client.user.setStatus('online');
    client.user.setActivity('Sticky', { type: 'WATCHING' });
});



client.on('messageCreate', message => {
    //message args
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (command === '-ban') {
        if (message.member.roles.cache.has('1008432117660778588')) { //staff
            if (message.member.roles.cache.has('791355452063350785')) { //sup
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (message.member.roles.cache.has('1069301362615140504')) { //test sup
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            const role = message.guild.roles.cache.find(role => role.id === "927240719524036658");
            //const member = message.mentions.members.first();
            const member = message.guild.members.cache.find(member => member.id === args[0]);
            if (!member) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            member.roles.add(role);
            const embed = new discord.EmbedBuilder()
                .setColor('#57F287')
                .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been banned.**`);
            message.channel.send({ embeds: [embed] });
            Ban.set(member.user.id, { name: member.user.username });
        }
    }
    

    if (command === '-modlogs') {
        //NICH FERTIG
        if (message.member.roles.cache.has('1008432117660778588')) {
            if (message.member.roles.cache.has('791355452063350785')) { //sup
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (message.member.roles.cache.has('1069301362615140504')) { //test sup
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if(!message.member.permissions.has('ADMINISTRATOR')) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            const member = message.guild.members.cache.find(member => member.id === args[0]);
            //get the type from the message
            const typemessage1 = args[1];
            //ignoriere die groß und kleinschreibung
            const typemessage = typemessage1.toLowerCase();
            if (!typemessage) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Please enter a type.**\n\n**Types:**\nWarn\nBan`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (!member) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            const number = modlogs.get(member.user.id, 'number');
            const reason = modlogs.get(member.user.id, 'reason');
            const type = modlogs.get(member.user.id, 'type');
            const moderator = modlogs.get(member.user.id, 'moderator');
            if(typemessage === "warn") {
                const embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has ${number} warnings.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if(typemessage === "ban") {
                const embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has ${number} bans.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            
        }
    }
    if (command === '-unban') {
        if (message.member.roles.cache.has('1008432117660778588')) {
            if (message.member.roles.cache.has('791355452063350785')) { //sup   
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (message.member.roles.cache.has('1069301362615140504')) { //test sup
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            const role = message.guild.roles.cache.find(role => role.id === "927240719524036658");
            const member = message.guild.members.cache.find(member => member.id === args[0]);
            if (member) {
                member.roles.remove(role);
                const embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been unbanned.**`);
                message.channel.send({ embeds: [embed] });
                Ban.delete(member.user.id);
            } else {
                const embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **No member found with ID: ${args[0]}**`);
                message.channel.send({ embeds: [embed] });
            }
        }
    }
    if (command === '-banner2') {
        console.log("workesd")
        const banner_role_list = ["1096390678575063191"]; // hier habe ich nur eine Testrolle benutzt
        const user = message.mentions.users.first() || message.author;

        if (message.member.roles.cache.some(role => banner_role_list.includes(role.id))) {
            const req = client.api.users(user.id).get();
            const banner_id = req.banner;
            if (banner_id) {
                const image_size = '?size=1024';
                const animated = banner_id.startsWith('a_');
                const file_extension = animated ? 'gif' : 'png';
                const image_base_url = 'https://cdn.discordapp.com/';
                const banners_endpoint = `banners/${user.id}/${banner_id}.${file_extension}`;
                const banner_url = `${image_base_url}${banners_endpoint}${image_size}`;

                const embed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('User Banner')
                .setImage(banner_url);

                message.channel.send(embed);
            } else {
                message.channel.send('This user does not have a banner.');
            }
        }
    }


    if (command === '-avatar') {
        const member = message.mentions.members.first();
        if (!member) {
            const embed = new discord.EmbedBuilder()
                .setColor('#F25757')
                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
            message.channel.send({ embeds: [embed] });
            return;
        }
        const embed = new discord.EmbedBuilder()
            .setColor('#57F287')
            .setImage(member.user.avatarURL({ dynamic: true, size: 4096, format: 'png'}));
        message.channel.send({ embeds: [embed] });
    }

    if (command === '-help') {
        const embed = new discord.EmbedBuilder()
            .setColor('#57F287')
            .setTitle('**Help**')
            .setDescription(`**${client.user.username}**\n**${client.user.username}** is a bot that was created by **fam1ne.**.<:sw_anime_tachiSmile:800440576310771744>\n\n**Commands:**\n**-help**\n**-avatar**\n**-banner**\n**-ban**\n**-unban**\n**-voiceuser**\n**-role**\n**-uq**\n**-afk**\n\n**Prefix:**\n**-**\n <a:sw_bearDontCry:927738522130083850>`);
    
    
        try {
            message.channel.send({ embeds: [embed] });
        } catch (e) {
            message.channel.send(`There was an error sending the embed:\n${e}`);
        }
    }
    if (command === '-banlist') {
        if(!message.member.roles.cache.has('1008432117660778588')) {
            return;
        }
        const embed = new discord.EmbedBuilder()
            .setColor('#57F287')
            .setTitle('**Banlist**')
            .setDescription(`**${Ban.size} users are banned.**`);
        Ban.forEach((ban, id) => {
            embed.addFields({name:`**${id}**`, value:`**${ban.name}**\n------`});
        });
        try {
            message.channel.send({ embeds: [embed] });
        } catch (e) {
            message.channel.send(`There was an error sending the embed:\n${e}`);
        }
    }
    if (command === '-voiceuser') {
        //check ob der user eine bestimme rolle hat wenn nicht return
        if (!message.member.roles.cache.has('1008432117660778588')) {
            return;
        }
        //bekomme aus der api https://discord.com/api/guilds/601129608514895902/widget.json die daten der momentanen user in einem voice channel use axios
        axios.get('https://discord.com/api/guilds/601129608514895902/widget.json')
            .then(function (response) {
                //handle success
                const embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<:sw_anime_tachiSmile:800440576310771744> **${response.data.voice_channel_count} users are in a voice channel.**`);
                message.channel.send({ embeds: [embed] });
            })
            .catch(function (error) {
                //handle error
                console.log(error);
            });
        
    }
    if (command === '-role') {
        //check ob der user manage roles permissions hat wenn nicht return permissionhas
        if (!message.member.permissions.has('ManageRoles')) {
            const embed = new discord.EmbedBuilder()
                .setColor('#F25757')
                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to use this command.**`);
            message.channel.send({ embeds: [embed] });
            return;
        }

        const member = message.mentions.members.first();
        const role = message.guild.roles.cache.find(role => role.name.toLowerCase() === args.slice(1).join(' ').toLowerCase());
        console.log(role.name);
        const teamroles = ["Admin", "Supporter", "Moderator", "Developer", "Head Admin", "Manager", "Test Supporter", "Head Moderator", "Event-Leitung","Event-Team","Staff"]
        if(!teamroles.includes(role.name)) {
            if (!member) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (!role) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Role not found.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (member.roles.cache.has(role.id)) {
                //entferne die rolle wieder
                member.roles.remove(role);
                const embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been removed from the role ${role.name}.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            if (message.member.roles.highest.comparePositionTo(role) < 0) {
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to give this role to the user.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            member.roles.add(role);
            const embed = new discord.EmbedBuilder()
                .setColor('#57F287')
                .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been given the role ${role.name}.**`);
            message.channel.send({ embeds: [embed] });
        }else {
            if(message.member.roles.cache.has('918742480227282954')) { //Manager
                if (!member) {
                    const embed = new discord.EmbedBuilder()
                        .setColor('#F25757')
                        .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }
                if (!role) {
                    const embed = new discord.EmbedBuilder()
                        .setColor('#F25757')
                        .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Role not found.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }
                if (member.roles.cache.has(role.id)) {
                    //entferne die rolle wieder
                    member.roles.remove(role);
                    const embed = new discord.EmbedBuilder()
                        .setColor('#57F287')
                        .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been removed from the role ${role.name}.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }
                //überprüfe ob role über dem user steht
                if (message.member.roles.highest.comparePositionTo(role) < 0) {
                    const embed = new discord.EmbedBuilder()
                        .setColor('#F25757')
                        .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to give this role to the user.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }
                member.roles.add(role);
                const embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been given the role ${role.name}.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            else if(message.member.roles.cache.has('1132708316297052281')) { //Head Admin
                if (!member) {
                    const embed = new discord.EmbedBuilder()
                        .setColor('#F25757')
                        .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }
                if (!role) {
                    const embed = new discord.EmbedBuilder()
                        .setColor('#F25757')
                        .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Role not found.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }
                if (member.roles.cache.has(role.id)) {
                    //entferne die rolle wieder
                    member.roles.remove(role);
                    const embed = new discord.EmbedBuilder()
                        .setColor('#57F287')
                        .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been removed from the role ${role.name}.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }
                //überprüfe ob role über dem user steht
                if (message.member.roles.highest.comparePositionTo(role) < 0) {
                    const embed = new discord.EmbedBuilder()
                        .setColor('#F25757')
                        .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **You are not allowed to give this role to the user.**`);
                    message.channel.send({ embeds: [embed] });
                    return;
                }
                member.roles.add(role);
                const embed = new discord.EmbedBuilder()
                    .setColor('#57F287')
                    .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been given the role ${role.name}.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
            else {
                const roles = message.member.roles.cache.map(role => role.id);
                console.log(roles);
                qu.set(message.author.id, { roles: roles });
                console.log("done dc")
                //nehme alle rollen die der user hat weg und gebe ihm die quarantäne rolle
                message.member.roles.set(['1126992460569129050']);
                const embed = new discord.EmbedBuilder()
                    .setColor('#F25757')
                    .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **For security reasons, this role could not be assigned.**`);
                message.channel.send({ embeds: [embed] });
                return;
            }
        }
        
       
    }
    if (command === '-uq' || command === '-unquarantine') {
        if (message.member.roles.cache.has('1082064851100237844' || '601130947831922741' || '1108030717390241822' || '1125122019156037733')) { 
            return;
        }
        //if (!message.member.roles.cache.has('601130947831922741')) { //Boss
            //return;
        //}
        //if (!message.member.roles.cache.has('1108030717390241822')) { //Direktor
            //return;
        //}
        //if (!message.member.roles.cache.has('1125122019156037733')) { //Head Admin
            //return;
        //}
        const member = message.guild.members.cache.find(member => member.id === args[0]);
        if (!member) {
            const embed = new discord.EmbedBuilder()
                .setColor('#F25757')
                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
            message.channel.send({ embeds: [embed] });
            return;
        }
        const roles = qu.get(member.user.id, 'roles');

        if (!roles) {
            const embed = new discord.EmbedBuilder()
                .setColor('#F25757')
                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User is not quarantined.**`);
            message.channel.send({ embeds: [embed] });
            return;
        }
        member.roles.set(roles);
        qu.delete(member.user.id);
        //wenn der user nicht in der datenbank ist embed
        if (!qu.has(member.user.id)) {
            //nicht in der datenbank 
            const embed = new discord.EmbedBuilder()
                .setColor('#57F287')
                .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} is not quarantined.**`);
            message.channel.send({ embeds: [embed] });
            return;
        }
        const embed = new discord.EmbedBuilder()
            .setColor('#57F287')
            .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been unquarantined.**`);
        message.channel.send({ embeds: [embed] });
    }
    //wenn ein user afk ist und eine nachricht schreibt entferne ihn aus der datrenbank
    if (afk.has(message.author.id)) {
        afk.delete(message.author.id);
        const embed = new discord.EmbedBuilder()
            .setColor('#57F287')
            .setDescription(`<a:sw_emote_checkMark:863402580083212332> **You are no longer AFK.**`);
        message.channel.send({ embeds: [embed] });
    }
    
    if (command === '-afk') {
        const reason = args.slice(0).join(' ');
        //lösche die nachricht
        message.delete();
        afk.set(message.author.id, { reason: reason });
        const embed = new discord.EmbedBuilder()
            .setColor('#57F287')
            .setDescription(`<a:sw_emote_checkMark:863402580083212332> **You are now AFK.**`);
        message.channel.send({ embeds: [embed] });
    }
   
    if (command === '-script') {
        //überprufe ob es ein bestimmter user ist per id
        if (message.author.id !== '887399821013569566') {
            return;
        }
        const script = args.slice(0).join(' ');
        //lösche die nachricht
        message.delete();
        // eval script falls ein fehler script ist schreibe das in einen embed
        eval(script);
        const embed = new discord.EmbedBuilder()
            .setColor('#57F287')
            .setDescription(`<a:sw_emote_checkMark:863402580083212332> **Script executed.**`)
            .addFields({name:'**Script**', value:`\`\`\`js\n${script}\`\`\``});
        message.channel.send({ embeds: [embed] });
        //schreibe den script in die konsole
        console.log(`${message.author.username}\n${script}`);
    }
   
    if (message.mentions.members.size > 0) {
        const mentioned = message.mentions.members.first();
        if (afk.has(mentioned.user.id)) {
            const reason = afk.get(mentioned.user.id, 'reason');
            const embed = new discord.EmbedBuilder()
                .setColor('#57F287')
                .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${mentioned.user} is AFK.**\n**Reason:** ${reason}`);
            message.channel.send({ embeds: [embed] });
        }
    }

    //erstelle ein embed das mit mehreren buttons
    if (command === '-test') {
        //wenn der
        //die buttons
        const button1 = new discord.ButtonBuilder()
            .setLabel('Regeln')
            .setStyle('1')
            .setCustomId('rules1');
        const button2 = new discord.ButtonBuilder()
            .setLabel('Warns')
            .setStyle('1')
            .setCustomId('warns2');
        const button3 = new discord.ButtonBuilder()
            .setLabel('Team-Liste')
            .setStyle('1')
            .setCustomId('team3');
        const button4 = new discord.ButtonBuilder()
            .setLabel('Rangliste')
            .setStyle('1')
            .setCustomId('rank4');
        const button5 = new discord.ButtonBuilder()
            .setLabel('Abmeldungen')
            .setStyle('Link')
            .setURL('https://docs.google.com/spreadsheets/d/1PiyFWZ4EMlIU_hqoBRa1CaiNe9DXFzudNoGZq0CTvuw/edit#gid=1767423063')
        const embed = new discord.EmbedBuilder()
            .setColor('#9B59B6')
            .setTitle('**Herzlich Willkommen im Info-Center!**')
            .setImage("https://cdn.discordapp.com/attachments/1037671361629405214/1074393851483131974/J8w2GMH.jpeg")
            .setDescription(`Hier findest du folgendes:\n- Team-Regeln\n- Team-Warns\n- Team-List\- Rank-List\n\n> Um mehr Informationen zu erhalten, trete bitte dem Info-Center bei.\n\nInvite-Link:\n[hier](https://discord.gg/spjTtTb5av)`)
        message.channel.send({ embeds: [embed], components: [{type: 1, components: [button1, button2, button3, button4, button5]}] });
    }

    
    if (command === '-warn') {
        //überprüfe ob der user die rechte hat
        if (!message.member.roles.cache.has('1008432117660778588')) {
            return;
        }
        const member = message.mentions.members.first();
        if (!member) {
            const embed = new discord.EmbedBuilder()
                .setColor('#F25757')
                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **User not found.**`);
            message.channel.send({ embeds: [embed] });
            return;
        }
        const reason = args.slice(1).join(' ');
        if (!reason) {
            const embed = new discord.EmbedBuilder()
                .setColor('#F25757')
                .setDescription(`<a:sw_emote_arrow_right:1121914814588002455> **Reason not found.**`);
            message.channel.send({ embeds: [embed] });
            return;
        }
        //wenn der user in der datenbank ist
        if (Warn.has(member.user.id)) {
            const warns = Warn.get(member.user.id, 'warns');
            Warn.set(member.user.id, { warns: warns + 1, reason: reason });
            //wennd er user in den modlogs ist
            if (modlogs.has(message.author.id)) {
                const number = modlogs.get(message.author.id, 'number');
                modlogs.set(message.author.id, { moderator: message.author.id, number: number + 1, reason: reason, type: 'Warn' });
            }else {
                modlogs.set(message.author.id, { moderator: message.author.id, number: 1, reason: reason, type: 'Warn' })
            }
            const embed = new discord.EmbedBuilder()
                .setColor('#57F287')
                .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been warned.**\n**Reason:** ${reason}`);
            message.channel.send({ embeds: [embed] });
            return;
        }
        Warn.set(member.user.id, { warns: 1, reason: reason });
        const embed = new discord.EmbedBuilder()
            .setColor('#57F287')
            .setDescription(`<a:sw_emote_checkMark:863402580083212332> **${member.user} has been team warned.**\n**Reason:** ${reason}`);
        message.channel.send({ embeds: [embed] });
    }

    //erstelle einen command der bilder mit einen prompt erstellt und sich dabei mit einen server verbindet


    //embed mit buttons
    if(command === '-test22') {
        message.delete();
        const em = new discord.EmbedBuilder()
            //farbe weiß
            .setColor('#FFFFFF')
            .setTitle('**Hier kannst du ein Ticket erstellen!**')
            .setDescription('**Report:**\n> Hier kannst du einen User melden.\n\n**Booster:**\n> Hier kannst du deine Custom Rolle machen lassen.\n\n**Sonstiges:**\n> Hier kannst du eine allgemeine Frage stellen.\n\n**Sponsoring:**\n> Hier kannst du unseren Server sponsern.\n\n**Bann-Info:**\n> Hier siehst du Informationen zu deinem Bann.\n\n**Entbannung:**\n> Hier kannst du eine Entbannung beantragen.')
            //powered by fam1ne. servers
            //iconurl path image.ico
            .setFooter({ text: 'Powered by Fam1ne. Servers', iconURL: 'https://cdn.discordapp.com/attachments/1096468616507043850/1136766747538636841/image.png'})
            //timestamp
            .setTimestamp()
        //select menu with this buttons as options und same ids
        const select = new discord.StringSelectMenuBuilder()
			.setCustomId('select')
			.setPlaceholder('Select a category')
			.addOptions(
				new discord.StringSelectMenuOptionBuilder()
                    .setLabel('Report')
                    .setDescription('Hier kannst du einen User melden.')
                    .setValue('report1'),
				new discord.StringSelectMenuOptionBuilder()
                    .setLabel('Booster')
                    .setDescription('Hier kannst du deine Custom Rolle machen lassen.')
                    .setValue('booster2'), 
				new discord.StringSelectMenuOptionBuilder()
                    .setLabel('Sonstiges')
                    .setDescription('Hier kannst du eine allgemeine Frage stellen.')
                    .setValue('sonstiges3'),
                new discord.StringSelectMenuOptionBuilder()
                    .setLabel('Sponsoring')
                    .setDescription('Hier kannst du eine Sponsering Anfrage stellen.')
                    .setValue('sponsering4'),
                new discord.StringSelectMenuOptionBuilder()
                    .setLabel('Bann-Info')
                    .setDescription('Hier kannst du Informationen über Banns erhalten.')
                    .setValue('banninfo5'),
                new discord.StringSelectMenuOptionBuilder()
                    .setLabel('Entbannungsantrag')
                    .setDescription('Hier kannst du eine Entbannung beantragen.')
                    .setValue('entbannungsantrag'),
			);
        const row = new discord.ActionRowBuilder()
			//.addComponents(select)
            .setComponents(select)
        //send the embed with the select menu
        message.channel.send({ embeds: [em], components: [row] });


        
    }
});
 


//erstelle ein event das die buttons äbfängt
client.on('interactionCreate', async interaction => {
    //wenn der button nicht von dem bot ist return
    //if (!interaction.isButton() || !interaction.isStringSelectMenu()) return;
    if(interaction.isButton()) {
        if (interaction.customId === 'claim') {
            // check ob der user eine bistimme rolle oder brechtigung hat
            if (!interaction.member.roles.cache.has('1008432117660778588') || !interaction.member.permissions.has('Administrator')) {
                interaction.reply({content:`<@${interaction.user.id}>`, content: 'Du hast keine Berechtigung um dieses Ticket zu claimen.', ephemeral: true});
            }
            //erstelle ein claim embed und sendet es in den channel
            const embed = new discord.EmbedBuilder()
                .setTitle('**Claim**')
                //dieses ticket wurde geclaimed von interaction.user.username
                .setDescription('Dieses Ticket wurde geclaimed von ' + interaction.user.username + '.')
                .setColor('#2ECC71');
            interaction.reply({content:`<@${interaction.user.id}>`, embeds: [embed]});
            return;
        }
    
        if (interaction.customId === 'close') {
            if (!interaction.member.roles.cache.has('1008432117660778588') || !interaction.member.permissions.has('Administrator')) {
                interaction.reply({content:`<@${interaction.user.id}>`, content: 'Du hast keine Berechtigung um dieses Ticket zu schließen.', ephemeral: true});
            }
            //erstelle ein close embed und sendet es in den channel
            //wartre vor dem löschvorgang 5 sekunden
            //das ticket wird gelöscht in 5 sec
            const embed = new discord.EmbedBuilder()
                .setTitle('**Close**')
                .setDescription('Das Ticket wird in 5 Sekunden gelöscht.')
                .setColor('#FF0000');
            interaction.reply({embeds: [embed]});
            //finde ein channel per id
            const channel = await interaction.guild.channels.fetch('1037671889801322516');
            const attachment = await discordTranscripts.createTranscript(interaction.channel);
            channel.send({content: `${interaction.channel.name}`, files: [attachment]});
            //sende das transcript in den channel
            setTimeout(function () {
                interaction.channel.delete();
            }, 5000);
            
        }
        
        if (interaction.customId === 'transcript') {
            //wenn der ticket opener in der db steht return
            const attachment = await discordTranscripts.createTranscript(interaction.channel);
            const embed = new discord.EmbedBuilder()
                .setTitle('**Transcript**')
                .setDescription('Hier ist dein Transcript.')
                .setColor('#FF0000');
            interaction.reply({embeds: [embed], files: [attachment]});
            
        }
        if (interaction.customId === 'rules1') {
            const embed = new discord.EmbedBuilder()
                .setColor('#9B59B6')
                .setTitle('**Aufgabenbereiche der Teamler**')
                .setThumbnail("https://cdn.discordapp.com/attachments/988173806881341460/988209767895945216/slyverworldlogo.png")
                .addFields({name:"**Supporter:**", value:"`1` Tickets bearbeiten Reports / Fragen, bei anderen, jeweilige Rolle pingen.\n\n`2` **1. Instanz** bei Fragen zu Servern sowie Meldungen ( Tickets ), moderieren in Text- sowie VoiceChannels."})
                .addFields({name:"**Moderator:**", value:"`3` Tickets ( Booster / Customrole, andere Tickets zuerst Supportern überlassen ).\n\n`4`  Zusätzlich Leute bannen sowie Entbannungstickets bearbeiten/Threads erstellen."})
                .addFields({name:"**SrMod:**", value:"`5` Gleich wie mod. Ratschläge an Moderatoren sowie Supportern geben."})
                .addFields({name:"**Admins:**", value:"`6` Geht euch **nichts** an."})
                .setImage("https://cdn.discordapp.com/attachments/988173806881341460/1054060232558518272/20221218_163835.gif")
            interaction.reply({ embeds: [embed], ephemeral: true});
        }
        //wenn der button von dem bot ist und die id warns2 ist schreibe ein embed
        if (interaction.customId === 'warns2') {
            //ein embed was alle warns auflistet aus der Warn datenbank der warn soll die reason und den user ansagen
            const embed = new discord.EmbedBuilder()
                .setColor('#9B59B6')
                .setTitle('**Warnlist**')
                .setDescription(`**${Warn.size} users are warned.**`);
            if(Warn.size === 0) {
                embed.addFields({name:`**No TeamWarns found.**`, value:`**N/A**`});
            }else {
                Warn.forEach((user, reason) => {
                    embed.addFields({name:`**${user}**`, value:`**${reason}**\n------`});
                });
            }
            interaction.reply({ embeds: [embed], ephemeral: true });
    
        }
        //wenn der button von dem bot ist und die id team3 ist schreibe ein embed
        if (interaction.customId === 'team3') {
            const jsonData = {
                "content": null,
                "embeds": [
                    {
                        "title": "SlyverWorld Team:",
                        "description": "**Hierarchie und Aufteilung der Teammitglieder**\n\nDie folgende Hierarchie zeigt direkt auf,\nwelche Aufgabenbereiche von den\neinzelnen Teammitgliedern abgedeckt werden.\n\n<@&601130947831922741>: Der Owner überwacht auf eine möglichst \nneutrale Art den reibungslosen Ablauf.\n<@349927269499666434>\n\n<@&1108030717390241822>: Die Direktion ist die rechte Hand des \nOwners für Entscheidungen der oberen \nSerververwaltung.\n<@1034123603924484128>\n\n<@&1082064851100237844>: Die Manager verweisen Teamler in ihre \nAufgabenbereiche und verwalten den Server.\n<@924727350346780714>\n<@1034123603924484128>\n<@452190296948736000>\n<@990455666068033596>\n\n<@&1125122019156037733>: Die Head Admins arbeiten eng mit \ndem Management zusammen und repräsentieren \nden administrativen Bereich.\n<@887399821013569566>\n<@945684129226317844>\n\n<@&778314696587477002>: Die Admins sind das Aushängeschild des \nServers und verbinden die Member mit dem \nServerteam.\n<@537247231724617728>\n<@830235311505408060>\n<@350640727488724992>\n<@813463827958071296>\n\n<@&974742920664055828>: Developer stellen Bots für den \nServer ein und schreiben eigenen Code für das \nTeam.\n<@256834191394603009>\n<@887399821013569566>\n\n<@&962054094443388948>: Head-Moderatoren tragen \nBeschwerden zusammen und sind diejenigen, \nwelche das Bindeglied zwischen Admins und \nModeratoren bilden.\n<@1062424413812838400>\n<@1058043320766566510>\n<@358965690071252993>\n<@463975204121477121>\n<@985435634678259753>\n<@726333269985067018>\n<@1082661021627469854>\n<@402069936387915778>\n\n<@&601132986611793930>: Moderatoren übernehmen die \nChatverwaltung und Kommunizieren in \nöffentlichen Kanälen mit den Usern.\n<@1071200650043588610>\n<@177443405675102208>\n<@771445667754672158>\n<@904171698369228880>\n<@1002214895665827890>\n<@1052999249333338162>\n<@591308744923807786>\n<@935612151589113888>\n<@988847800391446558>\n<@435061056608403458>\n<@714156407980687430>\n\n<@&791355452063350785>: Die Supporter bearbeiten Tickets, \nhelfen Usern auf möglichst freundliche Art und \nWeise und halten den Server aktiv.\n<@1078681495268511798>\n<@1077000518234296410>\n<@707687769840943174>\n<@1083745958900277408>\n<@954703191205892116>\n<@825833896301166672>\n<@791809905408999425>\n<@430444554924195862>\n<@902245510604283914>\n<@1128719083773366283>\n<@451757658605617182>",
                        "color": 3670088,
                        "footer": {
                        "text": "Boo"
                        },
                        "image": {
                            "url": "https://cdn.discordapp.com/attachments/988173806881341460/1054060232558518272/20221218_163835.gif"
                        },
                        "thumbnail": {
                            "url": "https://cdn.discordapp.com/attachments/988173806881341460/1109851766100594818/swblack.png"
                        }
                    }
                ],
                "attachments": []
            };
            const embedData = jsonData.embeds[0];
            const embed = new discord.EmbedBuilder(embedData)
            interaction.reply({ embeds: [embed], ephemeral: true});
        }
        //wenn der button von dem bot ist und die id rank4 ist schreibe ein embed
        if (interaction.customId === 'rank4') {
            const embed = new discord.EmbedBuilder()
                .setImage('https://cdn.discordapp.com/attachments/1037671361629405214/1074393851483131974/J8w2GMH.jpeg')
                .setColor('#9B59B6')
            
    
            const embed2 = new discord.EmbedBuilder()
                .setTitle('**Level-Rollen**')
                .setDescription('Auf SlyverWorld kannst du dir mit levelspezifischen Rollen einen Namen machen.\nDie Rollen, die du auf dem Server erhalten kannst, werden durch <@437808476106784770> und <@437808476106784770> verwaltet.')
                .addFields({name:'Rollen von Arcane', value:'<@&1074142958485516399> ab **Level 5**\n<@&1074142980476244000> ab **Level 10**\n<@&1074142983747796992> ab **Level 20**\n<@&1074142989603061891> ab **Level 30**\n<@&1074142994342613042> ab **Level 50**\n<@&843226097633853490> ab **Level 75**\n<@&843226093796327424> ab **Level 100**\n<@&894953531851808798> ab **Level 300**'})
                .addFields({name:'Nutzungshinweis', value:'Die Erfahrungspunkte, die für den Erhalt der Rollen wichtig sind, werden pro Nachricht jede Minute vergeben. Das Spammen von Nachrichten verschafft dir somit keinen Vorteil.'})
                .setColor('#9B59B6')
    
            const embed3 = new discord.EmbedBuilder()
                .setTitle('**Discord Nitro und Serverboosts**')
                .setDescription('Wenn du ein Nitro-Abonnement ($9.99) hast, erhälst du zwei Serverboosts gratis dazu. Wenn du den Server unterstützenmöchtest, kannst du diese gerne hier auf SlyverWorld nutzen.')
                .addFields({name:'SlyverWorld – Boosterbelohnungen', value:'Die Rolle <@&790407455322275881> wird an jede Nutzerin und jeden Nutzer vergeben, die SlyverWorld mit einem Serverboost unterstützen.\n\nWenn du deinen Boost drei Monate hier auf SlyverWorld benutzt, bekommst du als Dankeschön die Rolle <@&883271446435074058> oder <@&819627056073015377>!'})
                .addFields({name:'Wie kann ich mir eine eigene Rolle machen lassen?', value:'Wenn du beide Booster hier benutzt, kannst du dir eine sogenannte “Custom Role” (eigene Rolle) erstellen und anpassen lassen. Hierbei hast du freie Wahl über Name und Farbe!\n\nErstelle hierzu einfach ein Ticket in ⁠・support und warte, bis ein Moderatoren dir antwortet.'})
                .setColor('#9B59B6');
            const embed4 = new discord.EmbedBuilder()
                .setTitle('**Shop-Rollen**')
                .setDescription("Auf SlyverWorld kann man bei <@292953664492929025> einige Rollen im Tausch gegen die Bot-Währung kaufen.")
                .setColor('#9B59B6')
                .addFields({name:"**UnbelievaBoat-Rollen (nach Preis)**", value:"@💴 - :yen: 25,000\n@・ - :yen: 100,000\n@・ - :yen: 250,000\n<@&846069489090035722> - :yen: 2,500,000"})
    
            const embed5 = new discord.EmbedBuilder()
                .setTitle("Aktivitätsbelohnungen (“Activity Rewards”)")
                .setDescription("Nutzer, die einen hohen Grad an Aktivität zeigen, werden hier auch entsprechend belohnt!")
                .setColor('#9B59B6')
                .addFields({name:"**Sprachkanäle**", value:"Nutzerinnen und Nutzer, die sehr aktiv in den Sprachkanälen auf SlyverWorld sind, erhalten die Rolle <@&992451310974664735>"})
                .addFields({name:"**Textkanäle**", value:"Nutzerinnen und Nutzer, die sehr aktiv in den Textkanälen auf SlyverWorld sind, erhalten die Rolle <@&916030911110316132>"})
                .addFields[{name:"**Wie kann ich diese Rollen erhalten?**", value:"Die Rollen werden alle sieben Tage neu vergeben. Wer über die Zeit eine hohe Aktivität hatte, wird durch einen Statsbot ermittelt."}]
            const embed6 = new discord.EmbedBuilder()
                .setTitle("**Sonstige Rollen**")
                .setColor('#9B59B6')
                .setDescription("Neben den obengenannten Rollen gibt es natürlich noch viel mehr. Einige davon sieht man hier zusammengefasst:")
                .addFields({name:"**Geburtstagskind**", value:"<@&888937770435878922>: ist die Rolle, die Geburtstagskinder für ihren besonderen Tag haben werden. Die Rolle wird über den Birthday-Bot vergeben."})
                .addFields({name:"**Designer**", value:"<@&703255772489842849>: Nutzerinnen und Nutzer mit dieser Rolle lassen den Server gut aussehen. Sie kümmern sich um die Serverbanner und Serverbilder."})
                .addFields({name:"**Synchronsprecher**", value:"<@&896786172490170409>: Nutzerinnen und Nutzer mit dieser Rolle sind Synchronsprecher/-in – wer hätte das gedacht?"})
                .addFields({name:"**Content Creator**", value:"<@&610538464005455883>: Anhand dieser Rolle kann man die “Content Creator” auf SlyverWorld erkennen."})
                .addFields({name:"**Event-Gewinner**", value:"<@&898582566175666270>: Diese Person hat eines der Serverevents gewonnen."})
                .addFields({name:"**Serverpartner**", value:"<@&847216616671543326>: Jemand, der diese Rolle besitzt, hat selbst einen Server, der eine Partnerschaft mit SlyverWorld eingegangen ist."});
            interaction.reply({ embeds: [embed, embed2, embed3, embed4, embed6], ephemeral: true});
        }
    }else if(interaction.isAnySelectMenu()) {
        if (interaction.customId === 'select') {
            if (interaction.values[0] === 'report1') {
                //reply with meesssage dein ticket würd geöffnet
                interaction.reply({ content: 'Dein Ticket wird geöffnet...', ephemeral: true });
                //wenn der user eine bestimmte rolle hat reply mit du darfst kein ticket öffnen
                if (interaction.member.roles.cache.has('927240719524036658')) {
                    interaction.reply({ content: 'Du darfst dieses nicht Ticket öffnen!', ephemeral: true });
                    return;
                }
                //erstelle in einer betimmten category ein ticket und sendet eine nachricht in den channel
                const channel = await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.username}`,
                    type: 0,
                    parent: '829443274979934288',
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ['ViewChannel'],
                        },
                        {
                            id: interaction.user.id,
                            allow: ['ViewChannel', 'SendMessages'],
                        },
                        {
                            id: '1008432117660778588',
                            allow: ['ViewChannel'],
                        },
                    ],
                });
                //sendet eine nachricht in den channel
                const embed = new discord.EmbedBuilder()
                    .setTitle('**Report**')
                    .setDescription('Bitte beschreibe dein Problem möglichst genau, damit wir dir schnell helfen können.')
                    //farbe rot
                    .setColor('#FF0000');
                    //erstelle einen claim button
                const button = new discord.ButtonBuilder()
                    .setCustomId('claim')
                    .setLabel('Claim')
                    .setStyle('3');
                //ein button der das ticket schließt
                const button2 = new discord.ButtonBuilder()
                    .setCustomId('close')
                    .setLabel('Close')
                    .setStyle('4');
                const button3 = new discord.ButtonBuilder()
                    .setCustomId('transcript')
                    .setLabel('Transcript')
                    .setStyle('1');
                channel.send({content: `<@${interaction.user.id}>, <@&791355452063350785>, <@&1069301362615140504>` ,embeds: [embed], components: [{type: 1, components: [button, button2, button3]}]});     
                //schreibe in die claim db die button user id
            }
            if(interaction.values[0] === 'booster2') {
                interaction.reply({ content: 'Dein Ticket wird geöffnet...', ephemeral: true });
                if (interaction.member.roles.cache.has('927240719524036658')) {
                    interaction.reply({ content: 'Du darfst dieses nicht Ticket öffnen!', ephemeral: true });
                    return;
                }
                const channel = await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.username}`,
                    type: 0,
                    parent: '829443274979934288',
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ['ViewChannel'],
                        },
                        {
                            id: interaction.user.id,
                            allow: ['ViewChannel', 'SendMessages'],
                        },
                        {
                            id: '1008432117660778588',
                            allow: ['ViewChannel'],
                        },
                    ],
                });
                //sendet eine nachricht in den channel
                const embed = new discord.EmbedBuilder()
                    .setTitle('**Booster**')
                    //booster rollen text
                    .setDescription('Bitte beschreibe dein Problem möglichst genau, damit wir dir schnell helfen können.')
                    .setColor('#FF0000');
                //erstelle einen claim button
                const button = new discord.ButtonBuilder()
                    .setCustomId('claim')
                    .setLabel('Claim')
                    .setStyle('3');
                //ein button der das ticket schließt
                const button2 = new discord.ButtonBuilder()
                    .setCustomId('close')
                    .setLabel('Close')
                    .setStyle('4');
                const button3 = new discord.ButtonBuilder()
                    .setCustomId('transcript')
                    .setLabel('Transcript')
                    .setStyle('1');
                channel.send({content:`<@${interaction.user.id}>, <@&601132986611793930>, <@&962054094443388948>`, embeds: [embed], components: [{type: 1, components: [button, button2, button3]}]});
    
            }
            if(interaction.values[0] === "sponsering4") {
                interaction.reply({ content: 'Dein Ticket wird geöffnet...', ephemeral: true });
                if (interaction.member.roles.cache.has('927240719524036658')) {
                    interaction.reply({ content: 'Du darfst dieses nicht Ticket öffnen!', ephemeral: true });
                    return;
                }
                //wenn die user id in der claim db ist return
                if (Claim.get(interaction.user.id)) return interaction.reply({ content: 'Du hast bereits ein offenes Ticket!', ephemeral: true });
                const channel = await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.username}`,
                    type: 0,
                    parent: '829443274979934288',
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ['ViewChannel'],
                        },
                        {
                            id: interaction.user.id,
                            allow: ['ViewChannel', 'SendMessages'],
                        },
                        {
                            id: '778314696587477002',
                            deny: ['ViewChannel'],
                        },
                    ],
                });
                //sendet eine nachricht in den channel
                const embed = new discord.EmbedBuilder()
                    .setTitle('**Sponsering**')
                    .setDescription('Bitte beschreibe dein Problem möglichst genau, damit wir dir schnell helfen können.')
                    .setColor('#FF0000');
                //erstelle einen claim button
                const button = new discord.ButtonBuilder()
                    .setCustomId('claim')
                    .setLabel('Claim')
                    .setStyle('3');
                //ein button der das ticket schließt
                const button2 = new discord.ButtonBuilder()
                    .setCustomId('close')
                    .setLabel('Close')
                    .setStyle('4');
                const button3 = new discord.ButtonBuilder()
                    .setCustomId('transcript')
                    .setLabel('Transcript')
                    .setStyle('1');
                channel.send({content:`<@${interaction.user.id}>`,embeds: [embed], components: [{type: 1, components: [button, button2, button3]}]});
            }
            if(interaction.values[0] === "banninfo5") {
                //embed
                const embed = new discord.EmbedBuilder()
                    .setTitle('**Was ist das hier?**')
                    .setDescription('Dies ist die Banned-Area. Du bist hier weil du gegen Regeln verstoßen hast, deine Verstöße allerdings nicht so schlimm waren, dass wir dich direkt von Slyver World bannen wollten. Dies ist also deine persönliche Chance deinen Regelverstoß / deine Regelverstöße mit einem ordentlichen Entbannungsantrag zu entschuldigen. Diesen kannst du in den ⁠📝・antrag-Channel senden, welcher dann von einem Teammitglied durchgelesen wird und anschließend entschieden wird ob du wieder deinen ursprünglichen Member-Zugriff auf die anderen Channel zurück bekommst. Sollte uns dein Entbannungs-Antrag bzw. der Grund für dein Fehlverhalten nicht gefallen wirst du komplett gebannt. Sollte dir also etwas an dem Server liegen empfehlen wir, dass du uns dies wenigstens ein bisschen mit deinem Entbannungs-Antrag wissen lässt :)')
                    .addFields({name:"**Gründe wie:**", value:'Ich weiß nicht was ich gemacht habe" oder "Ich wurde zu unrecht gebannt" möchten wir nicht hören, da es definitiv einen Grund gibt warum du gebannt wurdest und wir auch von dir Erwarten, dass du dir über diesen selber im Klaren bist.'})
                    .addFields({name:"**WICHTIG**", value:"Solltest du diese Maßnahme mit einem rejoin auf den Server versuchen zu umgehen wirst du ohne weiteres gebannt und hast keine Möglichkeit mehr auf eine Entbannung!\n\n------------------------------------"})
                    .addFields({name:"**Vorlage**", value:"Warum wurde ich gebannt?\n\nDetaillierte Erklärung zum Vorfall Wer war in dem Vorfall involviert?\n\nWarum sollten wir dich wieder entbannen?\n\nVon wem wurde ich gebannt? (wenn bekannt)"})
                    //color red
                    .setColor('#FF0000')
                    .setImage('https://cdn.discordapp.com/attachments/852181538962800681/927256774057263104/slyverserverbanner.png');
                interaction.reply({embeds: [embed], ephemeral: true});
            }
            if(interaction.values[0] === "entbannungsantrag") {
                interaction.reply({ content: 'Dein Ticket wird geöffnet...', ephemeral: true });
                const channel = await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.username}`,
                    type: 0,
                    parent: '829443274979934288',
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ['ViewChannel'],
                        },
                        {
                            id: interaction.user.id,
                            allow: ['ViewChannel', 'SendMessages'],
                        },
                        {
                            id: '601132986611793930',
                            allow: ['ViewChannel'],
                        },
                        {
                            id: '962054094443388948',
                            allow: ['ViewChannel'],
                        }
                    ],
                });
                //schreibe die user id und channel id in die uban db
                //sendet eine nachricht in den channel
                const embed = new discord.EmbedBuilder()
                    .setTitle('**Entbannung**')
                    .setDescription('Bitte beschreibe dein Problem möglichst genau, damit wir dir schnell helfen können.')
                    .setColor('#FF0000');
                //erstelle einen claim button
                const button = new discord.ButtonBuilder()
                    .setCustomId('claim')
                    .setLabel('Claim')
                    .setStyle('3');
                //ein button der das ticket schließt
                const button2 = new discord.ButtonBuilder()
                    .setCustomId('close')
                    .setLabel('Close')
                    .setStyle('4');
                const button3 = new discord.ButtonBuilder()
                    .setCustomId('transcript')
                    .setLabel('Transcript')
                    .setStyle('1');

                channel.send({content:`<@${interaction.user.id}> <@&601132986611793930>, <@&962054094443388948>`,embeds: [embed], components: [{type: 1, components: [button, button2, button3]}]});
            }
            if(interaction.values[0] === 'sonstiges3') {
                if (interaction.member.roles.cache.has('927240719524036658')) {
                    interaction.reply({ content: 'Du darfst dieses nicht Ticket öffnen!', ephemeral: true });
                    return;
                }
                interaction.reply({ content: 'Dein Ticket wird geöffnet...', ephemeral: true });
                //wenn die user id in der claim db ist return
                const channel = await interaction.guild.channels.create({
                    name: `ticket-${interaction.user.username}`,
                    type: 0,
                    parent: '829443274979934288',
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: ['ViewChannel'],
                        },
                        {
                            id: interaction.user.id,
                            allow: ['ViewChannel', 'SendMessages'],
                        },
                        {
                            id: '1008432117660778588',
                            allow: ['ViewChannel'],
                        },
                    ],
                });
                //sendet eine nachricht in den channel
                const embed = new discord.EmbedBuilder()
                    .setTitle('**Ticket**')
                    .setDescription('Bitte beschreibe dein Problem möglichst genau, damit wir dir schnell helfen können.')
                    .setColor('#FF0000');
                //erstelle einen claim button
                const button = new discord.ButtonBuilder()
                    .setCustomId('claim')
                    .setLabel('Claim')
                    .setStyle('3');
                //ein button der das ticket schließt
                const button2 = new discord.ButtonBuilder()
                    .setCustomId('close')
                    .setLabel('Close')
                    .setStyle('4');
                const button3 = new discord.ButtonBuilder()
                    .setCustomId('transcript')
                    .setLabel('Transcript')
                    .setStyle('1');
                channel.send({content:`<@${interaction.user.id}>, <@&791355452063350785>, <@&1069301362615140504>`,embeds: [embed], components: [{type: 1, components: [button, button2, button3]}]});
                Claim.set(channel.id, interaction.user.id);
            }
        }
    }
    
    

    




});




//wenn ein user joint checkt die datenbank ob er gebannt ist und gibt ihm die rolle
client.on('guildMemberAdd', member => {
    if (Ban.has(member.user.id)) {
        const role = member.guild.roles.cache.find(role => role.id === "927240719524036658");
        member.roles.add(role);
    }
    //für qu bitte auch
    if (qu.has(member.user.id)) {
        const role = member.guild.roles.cache.find(role => role.id === "1126992460569129050");
        member.roles.add(role);
    }
    //geh in den chat channel und schick eine nachricht
    const channel = member.guild.channels.cache.find(ch => ch.id === '1094697571471085678');
    if (!channel) return;
    channel.send(`${member}**, willkommen auf SlyverWorld!**<a:sw_emote_kuromii_love:1122216000394379327>`);
});


//erstelle etwas um fehler zu verhindern
client.on('error', console.error);






























//test bot
//client.login('')

//main bot
//client.login('');
