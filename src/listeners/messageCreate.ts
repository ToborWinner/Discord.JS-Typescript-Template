import { ChatInputCommandInteraction, Interaction, Message, MessageInteraction } from "discord.js";
import BotClient from "../utils/BotClient";

export default (client: BotClient): void => {
    client.on("messageCreate", async (message: Message) => {
        if (message.author.bot) {
            return
        }
        if (message.attachments.size == 0) {
            if (!message.content || message.content == "") {
                client.app.log.error("Message content seems to be empty. Maybe the bot doesn't have the correct intents?")
                return
            }
        } else {
            if (!message.content || message.content == "") {
                return
            }
        }
        const prefix = "j2!"
        if (message.content.startsWith(prefix)) {
            try {
                await client.app.commandManager.handleLegacyCommand(message, prefix);
            } catch (e) {
                client.app.log.error("Error during execution of legacy command.", e)
            }
        }
    });
};