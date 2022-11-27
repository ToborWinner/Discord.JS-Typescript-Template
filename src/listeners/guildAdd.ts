import guildsSchema from "src/schemas/guilds-schema";
import BotClient from "../utils/BotClient";

export default (client: BotClient): void => {
    client.on("guildCreate", async (guild) => {
        client.app.log.info(`Joined guild ${guild.name} (${guild.id}).`);
        try {
            await guildsSchema.updateOne({
                guildId: guild.id
            },{
                guildId: guild.id,
                lastAdded: new Date()
            }, {upsert: true});
        } catch (e) {
            console.log
        }
    });
};