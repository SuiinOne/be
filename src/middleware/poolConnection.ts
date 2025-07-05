import { Request, Response, NextFunction } from "express";
import { pool } from "../config/db";
import { Connection } from "mysql2/typings/mysql/lib/Connection";

export const poolConnection = async (req: Request, res: Response, next: NextFunction) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("데이터베이스 pool 연결에 실패하였습니다.");
            return next(err);
        }

        console.log("데이터베이스 pool 연결 성공");

        (req as any).poolConnection = connection;

        res.on("finish", () => {
            if ((req as any).poolConnection) {
                (req as any).poolConnection.release();
            }
        })

        next();
    })
}