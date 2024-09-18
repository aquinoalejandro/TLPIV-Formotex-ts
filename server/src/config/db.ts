import { Sequelize } from "sequelize-typescript";
import { envs } from "../environments/environments";
import { User } from "../models/user";
import { Equipment } from "../models/equipment";
import { Client } from "../models/client";


const { DB_DIALECT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = envs;

const db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    models: [User, Equipment, Client],
});


export default db