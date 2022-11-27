import fs, { Dirent } from "fs"
import path from "path"
import { Button } from "../interfaces/Button"
import { Command } from "../interfaces/Command"
import { Modal } from "../interfaces/Modal"

const getFiles = (dir: string, suffix: string) : string[] => {
    const files: Dirent[] = fs.readdirSync(dir, {
        withFileTypes: true,
    })

    let commandFiles: string[] = []

    for (const file of files) {
        if (file.isDirectory()) {
            commandFiles = [
                ...commandFiles,
                ...getFiles(`${dir}/${file.name}`, suffix)
            ]
        } else if (file.name.endsWith(suffix)) {
            commandFiles.push(`${dir}/${file.name}`)
        }
    }

    return commandFiles
}

export default getFiles

export enum ObjectImportType {
    Modal,
    Button,
    Command
}

export function getObjects(type: ObjectImportType): (Command | Button | Modal)[] {
    const objects: (Command | Button | Modal)[] = []

    let type_string = ""
    switch (type) {
        case ObjectImportType.Button:
            type_string = "buttons"
            break
        case ObjectImportType.Modal:
            type_string = "modals"
            break
        case ObjectImportType.Command:
            type_string = "commands"
            break
        default:
            const never: never = type
    }
    const isTypeScript = __filename.endsWith('ts')
    let objectFiles = getFiles(path.join(process.cwd(), `${isTypeScript ? "src" : "dist"}/${type_string}`), isTypeScript ? ".ts" : ".js")
    for (const obj of objectFiles) {
        let objectFile = require(obj)
        if (objectFile.default) objectFile = objectFile.default
        objects.push(objectFile)
    }
    switch (type) {
        case ObjectImportType.Button:
            return objects as Button[]
        case ObjectImportType.Modal:
            return objects as Modal[]
        case ObjectImportType.Command:
            return objects as Command[]
        default:
            const never: never = type
            return []
    }
}