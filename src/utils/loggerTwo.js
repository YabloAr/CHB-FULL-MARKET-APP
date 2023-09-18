import winston from "winston";
import 'dotenv/config'

const { combine, timestamp, printf, colorize } = winston.format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
});

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
};
const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "blue",
    verbose: "magenta",
    debug: "cyan",
};

winston.addColors(colors);

export let logger;

switch (process.env.LOGGER_LEVEL) {
    case "debug":
        logger = winston.createLogger({
            levels,
            format: combine(
                colorize({ colors: true }),
                timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                myFormat
            ),
            transports: [
                new winston.transports.Console({
                    level: process.env.LOGGER_LEVEL, // Este nivel se mostrará en la consola
                    format: winston.format.colorize({ colors: true }),
                }),
            ],
        });
        break;
    case "info":
        logger = winston.createLogger({
            levels,
            format: combine(
                colorize({ colors: true }),
                timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                myFormat
            ),
            transports: [
                new winston.transports.Console({
                    level: process.env.LOGGER_LEVEL, // Este nivel se mostrará en la consola
                    format: winston.format.colorize({ colors: true }),
                }),
                new winston.transports.File({
                    filename: "./src/utils/logger.alerts.log",
                    level: "error", // Este nivel se registrará en el archivo
                }),
            ],
        });
        break;

    default:
}
