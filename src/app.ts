import express from "express";
import dotenv from "dotenv";
import listRoutes from "./routes/listing";
import { listingTables } from "./models/listingModel";
import { initDB } from "./config/db";

dotenv.config();
const app = express();
app.use(express.json());

initDB();
listingTables();

// routes
app.use("/api/listing", listRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => 
    console.log(`Server started on port ${PORT}`)
)