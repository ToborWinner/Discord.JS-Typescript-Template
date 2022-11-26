import { ButtonInteraction } from "discord.js";
import BotClient from "../utils/BotClient";

export enum ButtonIdType {
    Prefixed,
    Fixed
}

export interface ButtonParameters {
    client: BotClient,
    interaction: ButtonInteraction
}

export interface GeneralButton {
    botOwnerOnly?: boolean
    guildOwnerOnly?: boolean
    guildOnly?: boolean
    dmOnly?: boolean
    type: ButtonIdType
    run: (data: ButtonParameters) => Promise<void>;
}

export interface PrefixedIdButton extends GeneralButton {
    type: ButtonIdType.Prefixed
    customId: string
}

export interface FixedIdButton extends GeneralButton {
    type: ButtonIdType.Fixed
    customId: string
}

export type Button = PrefixedIdButton | FixedIdButton