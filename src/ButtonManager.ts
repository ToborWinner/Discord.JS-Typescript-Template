import { ButtonInteraction } from "discord.js";
import { DiscordBot } from "./DiscordBot";
import BotClient from "./utils/BotClient";
import { sendError } from "./utils/sendError";
import { Button, ButtonIdType } from "./interfaces/Button";
import { PingBtn } from "./buttons/debug/pingbtn";
import { ReturnBtn } from "./buttons/debug/returnmsg";
import { ModalBtn } from "./buttons/debug/modalbtn";

export default class ButtonManager {
    public app: DiscordBot
    public client: BotClient
    private buttons: Button[]
    constructor(app: DiscordBot) {
        this.app = app
        this.client = app.client
        this.buttons = [PingBtn, ReturnBtn, ModalBtn]
    }
    public async handleButton(interaction: ButtonInteraction): Promise<void>  {
        //TODO: permissions
        const button: Button | undefined = this.buttons.find(b => {
            if (b.type == ButtonIdType.Fixed) {
                return b.customId == interaction.customId
            } else if (b.type == ButtonIdType.Prefixed) {
                return interaction.customId.startsWith(b.customId)
            } else {
                const never: never = b
            }
        });
        if (!button) {
            this.client.app.log.warn(`No matching button was found. Button id: ${interaction.customId}; Guild ID: ${interaction.guildId}; User: ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id}).`)
            await sendError(interaction, "An error has occurred: no button matching yours was fonud.");
            return;
        }
        if (button.botOwnerOnly && !this.app.botOwners.includes(interaction.user.id)) {
            this.app.log.info(`Someone attempted to use a botOwners only button.  Button id: ${interaction.customId}; Guild ID: ${interaction.guildId}; User: ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id}).`)
            await sendError(interaction, "You don't have the required permission to run this button.", true)
            return
        }
        if (button.guildOnly && !interaction.inGuild()) {
            return
        }
        if (button.dmOnly && interaction.inGuild()) {
            return
        }
        if (button.guildOwnerOnly && interaction.inGuild() && interaction.user.id != interaction.guild?.ownerId) {
            await sendError(interaction, "You don't have the required permission to run this button.")
            return
        } else if (button.guildOwnerOnly && !interaction.inGuild()) {
            await sendError(interaction, "This button can only be ran in guilds.")
            return
        }
        try {
            await button.run({
                client: this.client,
                interaction: interaction
            });
        } catch (e) {
            this.app.log.error("There was an while executing a button function.", e)
            await sendError(interaction, "There was an error, sorry.")
            return
        }
    };
}