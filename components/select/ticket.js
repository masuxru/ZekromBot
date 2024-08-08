const { StringSelectMenuInteraction } = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'select',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {StringSelectMenuInteraction} interaction 
     */
    run: async (client, interaction) => {

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
};