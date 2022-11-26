import { ButtonStyle, ComponentType } from "discord.js";
import { Command, CommandType } from "../../interfaces/Command";

export const SendBtn: Command = {
    botOwnerOnly: true,
    name: "sendbtn",
    description: "Sends the buttons",
    input_type: CommandType.LegacyCommandOnly,
    run: async ({client, message}) => {
        try {
            message.reply({
                content: "Here are the buttons (in theory):",
                components: [
                    {
                        type: ComponentType.ActionRow,
                        components: [{
                            customId: "ping",
                            label: "Ping Button",
                            type: ComponentType.Button,
                            style: ButtonStyle.Secondary
                        },{
                            customId: "returnhey guys",
                            label: "Return Button",
                            type: ComponentType.Button,
                            style: ButtonStyle.Secondary
                        }]
                    }
                ]
            })
        } catch (e) {
            client.app.log.error("Error in ping command.", e)
        }
    }
};