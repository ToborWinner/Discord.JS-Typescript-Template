import { Colors, Message } from "discord.js";

enum ErrorCode {
    GeneralError
}

function convertErrorCode(code: ErrorCode): string {
    switch (code) {
        case ErrorCode.GeneralError:
            return "There was an error"
        default:
            return "There was an error"
    }
}

async function sendError(interaction: any, error? : string | ErrorCode, ephemeral = false) {
    let verification = false;
    //TODO: check if channel where people aren't supposed to type.
    let real_error = "There was an error, sorry."
    try {
        if (error) {
            if (typeof error == typeof ErrorCode) {
                real_error = convertErrorCode(error as unknown as ErrorCode)
            } else {
                real_error = error as string
            }
        }
    } catch (e) {
        console.log(e)
    }
    try {
        const content: any = {
            embeds:[
                {
                    description: real_error,
                    color:Colors.Red
                }
            ],
            ephemeral: ephemeral
        }
        if (verification) {
            if (interaction instanceof Message) {
                const msg = await interaction.channel.send(content)
                setTimeout(async () => {
                    try {
                        (msg as Message).delete();
                    } catch (e) {
                        console.log(e)
                    }
                }, 3000)
            } else {
                if (interaction.replied) {
                    await interaction.editReply(content).then(() => setTimeout(async () => {
                        try {
                            const msg: any = await interaction.fetchReply()
                            if (msg) {
                                await msg.delete()
                            }
                        } catch (e) {
                            console.log(e)
                        }
                    }, 3000))
                } else {
                    await interaction.reply(content).then(() => setTimeout(async () => {
                        try {
                            const msg: any = await interaction.fetchReply()
                            if (msg) {
                                await msg.delete()
                            }
                        } catch (e) {
                            console.log(e)
                        }
                    }, 3000))
                }
            }
        } else {
            if (interaction instanceof Message) {
                await interaction.channel.send(content)
            } else {
                if (interaction.replied) {
                    await interaction.editReply(content)
                } else {
                    await interaction.reply(content)
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export {
    sendError,
    sleep
}