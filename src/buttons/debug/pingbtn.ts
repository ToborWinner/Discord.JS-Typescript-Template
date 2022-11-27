import { Button, ButtonIdType } from "../../interfaces/Button";

const PingBtn: Button = {
    botOwnerOnly: true,
    customId: "ping",
    type: ButtonIdType.Fixed,
    run: async ({client, interaction}) => {
        try {
            await interaction.reply("Loading ping...");
            const msg = await interaction.fetchReply();
            const embed = {title:"BOT Latency Data",description:`Latency: ${msg.createdTimestamp - interaction.createdTimestamp} ms\nAPI Latency: ${Math.round(interaction.client.ws.ping)} ms`,footer:client.app.footer}
            await interaction.editReply({
                embeds:[embed],
                content:""
            })
        } catch (e) {
            client.app.log.error("Error in ping button.", e)
        }
    }
};
export default PingBtn