import { Modal, ModalIdType } from "../../interfaces/Modal";

export const TestModal: Modal = {
    botOwnerOnly: true,
    customId: "testmodal",
    type: ModalIdType.Fixed,
    run: async ({client, interaction}) => {
        try {
            const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
            await interaction.reply(`Your favorite color is ${favoriteColor}`);
        } catch (e) {
            client.app.log.error("Error in test modal.", e)
        }
    }
};