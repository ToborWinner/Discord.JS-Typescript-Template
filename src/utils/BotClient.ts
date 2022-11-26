import { Client } from "discord.js";
import { DiscordBot } from "../DiscordBot";

export default class BotClient extends Client {
    public app!: DiscordBot
}