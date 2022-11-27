import { Button, ButtonIdType } from "../../interfaces/Button";

const ReturnBtn: Button = {
    botOwnerOnly: true,
    customId: "return",
    type: ButtonIdType.Prefixed,
    run: async ({client, interaction}) => {
        try {
            await interaction.reply("Text: "+interaction.customId.replace("return",""));
        } catch (e) {
            client.app.log.error("Error in ping button.", e)
        }
    }
};
export default ReturnBtn