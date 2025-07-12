import express from "express";
import dotenv from "dotenv";
import listRoutes from "./routes/listing";
import path from 'path';
import YAML from 'yamljs';
import swaggerUi from 'swagger-ui-express';
import { listingTables } from "./models/listingModel";
import { initDB } from "./config/db";




dotenv.config();
const app = express();

// Swagger 세팅
const swaggerPath = path.join(__dirname, './swagger/openapi.yaml');
console.log('Swagger YAML 경로:', swaggerPath);
const swaggerSpec = YAML.load(swaggerPath);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    explorer: true,
  }));
  

app.use(express.json());

initDB();
listingTables();


app.use("/api/listing", listRoutes);
app.get("/ping", (req, res) => {
    res.send("pong");
  });
  



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
    console.log(`Server started on port ${PORT}`)
)