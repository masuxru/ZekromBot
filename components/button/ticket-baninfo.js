const { ButtonInteraction } = require('discord.js');
const discord = require('discord.js');
const ExtendedClient = require('../../class/ExtendedClient');

module.exports = {
    customId: 'baninfo5',
    /**
     * 
     * @param {ExtendedClient} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
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
};