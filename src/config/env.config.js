import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();
program.option("--mode <mode>", "Modo de trabajo", "DEVELOPMENT");
program.parse();

dotenv.config({
    path:
        program.opts().mode === "DEVELOPMENT"
            ? "./.env.development"
            : "./.env.production",
});

console.log("Options => ", program.opts());

export default {
    server: {
        PORT: parseInt(process.env.PORT) || 8080,
        STAGE: process.env.STAGE,
        LOGGER_LEVEL: process.env.LOGGER_LEVEL
    },
    mongo: {
        URL: process.env.MONGO_URL
    },
    sessions: {
        SECRET: process.env.SESSION_SECRET,
        JWT_KEY: process.env.JASONWEBTOKEN_KEY
    },
    github: {
        CLIENT_ID: process.env.GIT_HUB_STRATEGY_CLIENT_ID,
        CLIENT_SECRET: process.env.GIT_HUB_STRATEGY_CLIENT_SECRET,
        CALLBACK_URL: process.env.GIT_HUB_STRATEGY_CALLBACK_URL
    },
    admin: {
        ADMIN_EMAIL: process.env.ADMIN_EMAIL,
        ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
    },
    mailing: {
        SERVICE: process.env.MAILING_SERVICE,
        USER: process.env.MAILING_USER,
        PASSWORD: process.env.MAILING_PASSWORD
    },
    twilio: {
        SID: process.env.TWILIO_ACCOUNT_SID,
        AUTH: process.env.TWILIO_AUTH_TOKEN,
        NUMBER: process.env.TWILIO_NUMBER
    }
}
