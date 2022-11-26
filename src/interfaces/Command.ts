import { ChatInputCommandInteraction, ChatInputApplicationCommandData, Message } from "discord.js";
import BotClient from "../utils/BotClient";

export enum CommandType {
    SlashCommandOnly,
    LegacyCommandOnly,
    SlashAndLegacyCommand
}

export interface CommandParameters {
    client: BotClient
}

export interface SlashCommandParameters extends CommandParameters {
    interaction: ChatInputCommandInteraction,
    message?: never
}

export interface LegacyCommandParameters extends CommandParameters {
    message: Message,
    interaction?: never
}

export interface SlashAndLegacyCommandParameters extends CommandParameters {
    message?: Message,
    interaction?: ChatInputCommandInteraction
}

export interface GeneralCommand {
    input_type: CommandType
    botOwnerOnly?: boolean
    guildOwnerOnly?: boolean
    guildOnly?: boolean
    dmOnly?: boolean
}

export interface SlashCommand extends GeneralCommand,ChatInputApplicationCommandData {
    input_type: CommandType.SlashCommandOnly
    run: (data: SlashCommandParameters) => Promise<void>;
}

export interface LegacyCommand extends GeneralCommand {
    input_type: CommandType.LegacyCommandOnly
    name: string
    description: string
    run: (data: LegacyCommandParameters) => Promise<void>;
}

export interface SlashAndLegacyCommand extends GeneralCommand,ChatInputApplicationCommandData {
    input_type: CommandType.SlashAndLegacyCommand
    run: (data: SlashAndLegacyCommandParameters) => Promise<void>;
}

export type Command = SlashCommand | LegacyCommand | SlashAndLegacyCommand