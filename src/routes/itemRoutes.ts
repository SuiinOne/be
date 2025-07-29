import { buyItem, getItemHistory, getItemStats } from "../controllers/itemController";
import express from "express";
const router = express.Router();

router.patch("/:id", buyItem);
router.get("/:id/history", getItemHistory);
router.get("/:id/stats", getItemStats);

export default router;