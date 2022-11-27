import { ModalSubmitInteraction } from "discord.js";
import BotClient from "../utils/BotClient";

export enum ModalIdType {
    Prefixed,
    Fixed
}

export interface ModalParameters {
    client: BotClient,
    interaction: ModalSubmitInteraction
}

export interface GeneralModal {
    botOwnerOnly?: boolean
    guildOwnerOnly?: boolean
    guildOnly?: boolean
    dmOnly?: boolean
    type: ModalIdType
    run: (data: ModalParameters) => Promise<void>;
}

export interface PrefixedIdModal extends GeneralModal {
    type: ModalIdType.Prefixed
    customId: string
}

export interface FixedIdModal extends GeneralModal {
    type: ModalIdType.Fixed
    customId: string
}

export type Modal = PrefixedIdModal | FixedIdModal