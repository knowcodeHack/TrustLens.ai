import { Router } from "express";
import { ingestLogs } from "../controllers/ingest";

const router = Router();

router.post("/logs", ingestLogs);

export default router;
