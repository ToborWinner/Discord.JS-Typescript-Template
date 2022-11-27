import { ActionRowBuilder, ModalBuilder, TextInputBuilder } from "@discordjs/builders";
import { TextInputStyle } from "discord.js";
import { Button, ButtonIdType } from "../../interfaces/Button";

const ModalBtn: Button = {
    botOwnerOnly: true,
    customId: "modalbtn",
    type: ButtonIdType.Fixed,
    run: async ({client, interaction}) => {
        const modal = new ModalBuilder()
        modal.setCustomId("testmodal")
        modal.setTitle("Test Modal")
        const favoriteColorInput = new TextInputBuilder()
			.setCustomId('favoriteColorInput')
		    // The label is the prompt the user sees for this input
			.setLabel("What's your favorite color?")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);
        const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(favoriteColorInput);
        modal.addComponents(firstActionRow)
        try {
            await interaction.showModal(modal)
        } catch (e) {
            client.app.log.error("There was an error while sending a modal.", e)
        }
    }
};
export default ModalBtn