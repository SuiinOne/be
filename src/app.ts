import express from "express";
import dotenv from "dotenv";
import ListRoutes from "./routes/listingRoutes";
import likeRoutes from "./routes/likeRoutes";
import gameTypeRoutes from './routes/gameTypeRoute';
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger"; 
import { AppDataSource } from './config/data-source'; 
import helloSuiRoutes from './routes/helloSuiRoutes';
import itemRoutes from './routes/itemRoutes';

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

// 라우터 등록
app.use('/api/listing', ListRoutes);
app.use("/api", likeRoutes); 
app.use('/api', gameTypeRoutes);
app.use('/api/item', itemRoutes);

//트랜잭션 보내기 테스트용 라우터
app.use('/api', helloSuiRoutes);

app.get("/ping", (req, res) => {
  res.send("pong");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
