import { Router } from "express";
import { listItem } from "../controllers/listController";
import { poolConnection } from "../middleware/poolConnection";

const router = Router();


router.get("/",poolConnection, listItem);
//router.get("/:id", listItemDetail);

export default router;