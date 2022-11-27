import { ChatInputCommandInteraction, Message } from "discord.js";
import { Command, CommandType } from "./interfaces/Command";
import { DiscordBot } from "./DiscordBot";
import BotClient from "./utils/BotClient";
import { sendError } from "./utils/sendError";
import { getObjects, ObjectImportType } from "./utils/getFiles";

export default class CommandManager {
    public app: DiscordBot
    public client: BotClient
    private commands: Command[]
    constructor(app: DiscordBot) {
        this.app = app
        this.client = app.client
        this.commands = getObjects(ObjectImportType.Command) as Command[]
    }
    public async handleSlashCommand(interaction: ChatInputCommandInteraction): Promise<void>  {
        //TODO: permissions
        const slashCommand: Command | undefined = this.commands.find(c => c.name === interaction.commandName);
        if (!slashCommand) {
            this.client.app.log.warn(`No matching command was found. Command name: ${interaction.commandName}; Guild ID: ${interaction.guildId}; User: ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id}).`)
            await sendError(interaction, "An error has occurred: no command matching yours was fonud.");
            return;
        }
        if (slashCommand.botOwnerOnly && !this.app.botOwners.includes(interaction.user.id)) {
            this.app.log.info(`Someone attempted to run a botOwners only command.  Command name: ${interaction.commandName}; Guild ID: ${interaction.guildId}; User: ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id}).`)
            await sendError(interaction, "You don't have the required permission to run this command.", true)
            return
        }
        if (slashCommand.guildOnly && !interaction.inGuild()) {
            return
        }
        if (slashCommand.dmOnly && interaction.inGuild()) {
            return
        }
        if (slashCommand.guildOwnerOnly && interaction.inGuild() && interaction.user.id != interaction.guild?.ownerId) {
            await sendError(interaction, "You don't have the required permission to run this command.")
            return
        } else if (slashCommand.guildOwnerOnly && !interaction.inGuild()) {
            await sendError(interaction, "This command can only be ran in guilds.")
            return
        }
        switch (slashCommand.input_type) {
            case CommandType.SlashCommandOnly:
                try {
                    await slashCommand.run({
                        client: this.client,
                        interaction: interaction
                    });
                } catch (e) {
                    this.app.log.error("There was an while executing a command.", e)
                    await sendError(interaction, "There was an error, sorry.")
                    return
                }
                break
            case CommandType.LegacyCommandOnly:
                this.client.app.log.warn(`No matching command was found. Command name: ${interaction.commandName}; Guild ID: ${interaction.guildId}; User: ${interaction.user.username}#${interaction.user.discriminator} (${interaction.user.id}).`)
                await sendError(interaction, "An error has occurred: no command matching yours was fonud.");
                break
            case CommandType.SlashAndLegacyCommand:
                try {
                    await slashCommand.run({
                        client: this.client,
                        interaction: interaction
                    });
                } catch (e) {
                    this.app.log.error("There was an while executing a command.", e)
                    await sendError(interaction, "There was an error, sorry.")
                    return
                }
                break
            default:
                const never: never = slashCommand
                break
        }
    };
    public async handleLegacyCommand(message: Message, prefix: string): Promise<void>  {
        //TODO: permissions
        const legacyCommand: Command | undefined = this.commands.find(c => c.name === message.content.replace(prefix, "").split(" ")[0]);
        if (!legacyCommand) {
            this.app.log.warn(`No matching legacy command was found. Message: ${message.content}; Guild ID: ${message.guildId}; User: ${message.author.username}#${message.author.discriminator} (${message.author.id}).`)
            return;
        }
        if (legacyCommand.botOwnerOnly && !this.app.botOwners.includes(message.author.id)) {
            this.app.log.info(`Someone attempted to run a botOwners only legacy command.  Command name: ${legacyCommand.name}; Guild ID: ${message.guildId}; User: ${message.author.username}#${message.author.discriminator} (${message.author.id}).`)
            return
        }
        if (legacyCommand.guildOnly && !message.inGuild()) {
            return
        }
        if (legacyCommand.dmOnly && message.inGuild()) {
            return
        }
        if (legacyCommand.guildOwnerOnly && message.inGuild() && message.author.id != message.guild?.ownerId) {
            await sendError(message, "You don't have the required permission to run this command.")
            return
        } else if (legacyCommand.guildOwnerOnly && !message.inGuild()) {
            await sendError(message, "This command can only be ran in guilds.")
            return
        }
        switch (legacyCommand.input_type) {
            case CommandType.LegacyCommandOnly:
                try {
                    await legacyCommand.run({
                        client: this.client,
                        message: message
                    });
                } catch (e) {
                    this.app.log.error("There was an error while executing a command.", e)
                }
                break
            case CommandType.SlashCommandOnly:
                this.app.log.warn(`No matching legacy command was found. Message command: ${message.content.split(" ")[0]}; Guild ID: ${message.guildId}; User: ${message.author.username}#${message.author.discriminator} (${message.author.id}).`)
                break
            case CommandType.SlashAndLegacyCommand:
                try {
                    await legacyCommand.run({
                        client: this.client,
                        message: message
                    });
                } catch (e) {
                    this.app.log.error("There was an error while executing a command.", e)
                }
                break
            default:
                const never: never = legacyCommand
                break
        }
    };
}