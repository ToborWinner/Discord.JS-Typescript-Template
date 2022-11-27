import { ApplicationCommandType } from "discord.js";
import { Command, CommandType } from "../../interfaces/Command";

const Ping: Command = {
    botOwnerOnly: true,
    name: "ping",
    description: "Returns the bot's ping",
    type: ApplicationCommandType.ChatInput,
    input_type: CommandType.SlashAndLegacyCommand,
    run: async ({client, interaction, message}) => {
        try {
            if (message) {
                const msg = await message.reply("Loading ping...");
                const embed = {title:"BOT Latency Data",description:`Latency: ${msg.createdTimestamp - message.createdTimestamp} ms\nAPI Latency: ${Math.round(message.client.ws.ping)} ms`,footer:client.app.footer}
                await msg.edit({
                    embeds:[embed],
                    content:""
                })
            } else if (interaction) {
                await interaction.reply("Loading ping...");
                const msg = await interaction.fetchReply();
                const embed = {title:"BOT Latency Data",description:`Latency: ${msg.createdTimestamp - interaction.createdTimestamp} ms\nAPI Latency: ${Math.round(interaction.client.ws.ping)} ms`,footer:client.app.footer}
                await interaction.editReply({
                    embeds:[embed],
                    content:""
                })
            }
        } catch (e) {
            client.app.log.error("Error in ping command.", e)
        }
    }
};
export default Ping