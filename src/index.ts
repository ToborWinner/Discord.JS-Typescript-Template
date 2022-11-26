import Cluster from "discord-hybrid-sharding";
import dotenv from "dotenv"
import Logger, { LoggerType } from "./utils/Logger";

dotenv.config()

const managerLogger = new Logger(LoggerType.Manager)

if (!process.env.DISC_TOKEN) {
    managerLogger.fatal("No DISC_TOKEN enviroment variable found.")
    process.exit(0)
}

const manager = new Cluster.Manager(`${__dirname}/Bot.js`, {
    token: process.env.DISC_TOKEN,
    mode: "process",
    totalClusters: 1
})

manager.extend(
    new Cluster.HeartbeatManager({
        interval: 2000, // Interval to send a heartbeat
        maxMissedHeartbeats: 5, // Maximum amount of missed Heartbeats until Cluster will get respawned
    })
)

manager.on('clusterCreate', cluster => managerLogger.info(`Launched Cluster ${cluster.id}`));
manager.on('debug', async (...args) => {
    try {
        managerLogger.debug(args.shift()!, ...args)
    } catch (e) {
        managerLogger.warn("Failed to log debug information.", e)
    }
});

manager.spawn({ timeout: -1 });