import { ModalSubmitInteraction } from "discord.js";
import { DiscordBot } from "./DiscordBot";
import BotClient from "./utils/BotClient";
import { sendError } from "./utils/sendError";
import { Modal, ModalIdType } from "./interfaces/Modal";
import { getObjects, ObjectImportType } from "./utils/getFiles";

export default class ModalManager {
    public app: DiscordBot
    public client: BotClient
    private modals: Modal[]
    constructor(app: DiscordBot) {
        this.app = app
        this.client = app.client
        this.modals = getObjects(ObjectImportType.Modal) as Modal[]
    }
    public async handleModal(interaction: ModalSubmitInteraction): Promise<void>  {
        //TODO: permissions
        const modal: Modal | undefined = this.modals.find(m => {
            if (m.type == ModalIdType.Fixed) {
                return m.customId == interaction.customId
            } else if (m.type == ModalIdType.Prefixed) {
                return interaction.customId.startsWith(m.customId)
            } else {
                const never: never = m
            }
        });
        if (!modal) {
            this.client.app.log.warn(`No matching modal was found. Modal id: ${interaction.customId}; Guild ID: ${interaction.guildId}; User: ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id}).`)
            await sendError(interaction, "An error has occurred: no modal matching yours was fonud.");
            return;
        }
        if (modal.botOwnerOnly && !this.app.botOwners.includes(interaction.user.id)) {
            this.app.log.info(`Someone attempted to use a botOwners only modal.  Modal id: ${interaction.customId}; Guild ID: ${interaction.guildId}; User: ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id}).`)
            await sendError(interaction, "You don't have the required permission to submit this modal.", true)
            return
        }
        if (modal.guildOnly && !interaction.inGuild()) {
            return
        }
        if (modal.dmOnly && interaction.inGuild()) {
            return
        }
        if (modal.guildOwnerOnly && interaction.inGuild() && interaction.user.id != interaction.guild?.ownerId) {
            await sendError(interaction, "You don't have the required permission to submit this modal.")
            return
        } else if (modal.guildOwnerOnly && !interaction.inGuild()) {
            await sendError(interaction, "This command can only be ran in guilds.")
            return
        }
        try {
            await modal.run({
                client: this.client,
                interaction: interaction
            });
        } catch (e) {
            this.app.log.error("There was an while executing a modal function.", e)
            await sendError(interaction, "There was an error, sorry.")
            return
        }
    };
}