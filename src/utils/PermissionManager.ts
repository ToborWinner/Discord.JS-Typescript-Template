import { Guild, GuildMember } from "discord.js";
import { DiscordBot } from "src/DiscordBot";

export default class PermissionManager {
    public app: DiscordBot
    constructor(app: DiscordBot) {
        this.app = app
    }

    public async memberHigherThan(guild: Guild, member1: GuildMember, member2: GuildMember): Promise<boolean> {
        return true
    }
}