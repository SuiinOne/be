import { buyItem } from "../controllers/itemController";
import express from "express";
const router = express.Router();

router.patch("/:id", buyItem);

export default router;