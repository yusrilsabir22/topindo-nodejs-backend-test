import { DataSource } from "typeorm";
import { config } from "dotenv";
import path from 'path';
import { User } from "../entity/User";

config()

export default new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT!),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: false,
    logging: false,
    entities: [
        User
    ],
    migrations: [
        path.resolve(__dirname, "..", "migrations", "*")
    ],
    subscribers: [],
})