import { ButtonInteraction, ChatInputCommandInteraction, Interaction } from "discord.js";
import BotClient from "../utils/BotClient";

export default (client: BotClient): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.user.bot) {
            client.app.log.warn(`Bot attempted to use an interaction. User: ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id}).`)
            return
        }
        if (interaction.isCommand()) {
            try {
                await client.app.commandManager.handleSlashCommand(interaction as ChatInputCommandInteraction);
            } catch (e) {
                client.app.log.error("Error during execution of command.", e)
            }
        } else if (interaction.isButton()) {
            try {
                await client.app.buttonManager.handleButton(interaction as ButtonInteraction)
            } catch (e) {
                client.app.log.error("Error during execution of button.", e)
            }
        }
    });
};