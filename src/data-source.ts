import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
import { File } from "./entity/file.entity";
import { Group } from "./entity/group.entity";
import { User } from "./entity/user.entity";

// Load environment variables from .env file
dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "admin",
    password: process.env.DB_PASSWORD || "admin",
    database: process.env.DB_NAME || "test",
    synchronize: true,
    logging: true,
    entities: [File, Group, User],
    migrations: ['src/migration/*.ts'],
    subscribers: [],
})