import "reflect-metadata"; 
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Like } from '../models/like';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Like],
    synchronize: true, // 개발용. 자동 테이블 생성
    logging: true,
});
