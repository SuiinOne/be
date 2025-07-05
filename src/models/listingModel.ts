import { pool } from "../config/db";

export const listingTables = async () => {
    const createListingTableSQL = `
    CREATE TABLE IF NOT EXISTS listing (
        id VARCHAR(255) PRIMARY KEY,
        owner VARCHAR(255) NOT NULL,
        type_name VARCHAR(255),
        price BIGINT,
        metadata JSON,
        created_at TIMESTAMP
    )`;

    try {
        await pool.promise().query(createListingTableSQL);
        console.log('listing 테이블 생성 완료');
    } catch (error) {
        console.error('listing 테이블 생성 실패:', error);
    }
};