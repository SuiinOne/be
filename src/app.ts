import express from "express";
import dotenv from "dotenv";
import listRoutes from "./routes/listing";
import likeRoutes from "./routes/likeRoutes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger"; 
import { listingTables } from "./models/listingModel";
import { initDB } from "./config/db";
import { AppDataSource } from './config/data-source'; 


dotenv.config();
const app = express();

// Swagger UI 설정 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));

app.use(express.json());

// DB 초기화
AppDataSource.initialize()
  .then(() => {
    console.log('DB 연결 및 테이블 생성 완료');
  })
  .catch((error) => {
    console.error('DB 연결 실패:', error);
  });

initDB();
listingTables();

// 라우터 등록
app.use("/api/listing", listRoutes);
app.use("/api", likeRoutes); //

app.get("/ping", (req, res) => {
  res.send("pong");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
