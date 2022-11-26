import chalk from "chalk";

enum LoggerType {
    Manager,
    Bot
}

class Logger {
    private type: LoggerType
    private prefix: string
    constructor(type: LoggerType = LoggerType.Bot) {
        this.type = type
        this.prefix = ""
        if (this.type == LoggerType.Manager) {
            this.prefix = chalk.bgBlue("MANAGER") + " > "
        } else if (this.type == LoggerType.Bot) {
            this.prefix = ""
        } else {
            const never: never = this.type
        }
    }
    public debug(message: string, ...args: any[]): void {
        console.log(this.prefix+chalk.bgGray("DEBUG") + " > "+chalk.gray(message), ...args)
    }
    public info(message: string, ...args: any[]): void {
        console.log(this.prefix+chalk.bgGreen("INFO") + " > "+chalk.white(message), ...args)
    }
    public warn(message: string, ...args: any[]): void {
        console.log(this.prefix+chalk.bgYellow("WARN") + " > "+chalk.yellow(message), ...args)
    }
    public error(message: string, ...args: any[]): void {
        console.log(this.prefix+chalk.bgRed("ERROR") + " > "+chalk.red(message), ...args)
    }
    public fatal(message: string, ...args: any[]): void {
        console.log(this.prefix+chalk.bgRed.bold("FATAL ERROR") + " > "+chalk.red.bold(message), ...args)
    }
}

export default Logger
export {
    LoggerType
}