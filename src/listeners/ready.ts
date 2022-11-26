import BotClient from "../utils/BotClient";

export default (client: BotClient): void => {
    client.on("ready", async () => {
        if (!client.user || !client.application) {
            client.app.log.error("Skipping ready function, client.user or client.application not found.");
            return;
        }
        client.app.footer.iconURL = client.user?.avatarURL() || undefined

        //await client.application.commands.set(client.app.commandManager.commands);

        client.app.log.info(`${client.user.username}#${client.user.discriminator} (${client.user.id}) should now be online.`);
    });
};