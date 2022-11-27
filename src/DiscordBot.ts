import Cluster from "discord-hybrid-sharding";
import { EmbedFooterOptions, GatewayIntentBits, Partials } from "discord.js";
import ButtonManager from "./ButtonManager";
import CommandManager from "./CommandManager";
import interactionCreate from "./listeners/interactionCreate";
import messageCreate from "./listeners/messageCreate";
import ready from "./listeners/ready";
import ModalManager from "./ModalManager";
import BotClient from "./utils/BotClient";
import Logger from "./utils/Logger";
import PermissionManager from "./utils/PermissionManager";

export class DiscordBot {
    public client: BotClient
    public log: Logger
    public cluster: Cluster.Client
    public botOwners: string[]
    public commandManager: CommandManager
    public buttonManager: ButtonManager
    public modalManager: ModalManager
    public permissionManager: PermissionManager
    public footer: EmbedFooterOptions
    constructor() {
        this.log = new Logger()
        this.client = new BotClient({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.DirectMessages
            ],
            partials: [
                Partials.Channel
            ],
            shards: Cluster.Client.getInfo().SHARD_LIST, // An array of shards that will get spawned
            shardCount: Cluster.Client.getInfo().TOTAL_SHARDS, // Total number of shards
        });
        this.client.app = this
        if (process.env.BOT_OWNER) {
            this.botOwners = [process.env.BOT_OWNER]
        } else {
            this.log.warn("No BOT_OWNER enviroment variable found.")
            this.botOwners = []
        }
        this.footer = {
            text: "Jolly V2"
        }
        this.cluster = new Cluster.Client(this.client);
        this.log.debug("Initializing managers...")
        this.commandManager = new CommandManager(this)
        this.buttonManager = new ButtonManager(this)
        this.modalManager = new ModalManager(this)
        this.permissionManager = new PermissionManager(this)
        this.log.debug("Initializing discord.js listeners...")
        ready(this.client)
        interactionCreate(this.client)
        messageCreate(this.client)
        this.log.info("Initialization complete.")
    }
    public async start() {
        const token = process.env.DISC_TOKEN
        if (!token) {
            this.log.fatal("Discord token not found. Could not login.")
            process.exit(0)
        }
        try {
            await this.client.login(token)
        } catch (e) {
            this.log.fatal("Failed to login with discord.", e)
            process.exit(0)
        }
        this.log.info("Successefully logged in with discord.")
    }
}