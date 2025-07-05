import dotenv from "dotenv";
import {Pool, createPool, createConnection} from "mysql2";

dotenv.config();

export const initDB = async () => {
    try {
        const connection = createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });

        connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``);
        console.log(`${process.env.DB_NAME} 생성 완료`)
        connection.end();
    } catch (err) {
        console.log(`${process.env.DB_NAME} 생성 중 에러 발생 `, err);
    }
}

export const pool: Pool = createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
