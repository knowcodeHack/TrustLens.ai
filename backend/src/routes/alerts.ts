import { Router } from "express";
import pool from "../db";

const router = Router();

router.get("/", async (req, res) => {
  const orgId = req.query.orgId;
  if (!orgId) return res.status(400).json({ message: "orgId required" });

  try {
    const { rows } = await pool.query(
      "SELECT * FROM anomalies WHERE org_id = $1 ORDER BY created_at DESC",
      [orgId]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "DB Error" });
  }
});

router.patch("/:id/resolve", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      "UPDATE anomalies SET status = 'safe' WHERE id = $1",
      [id]
    );
    res.json({ message: "Resolved" });
  } catch (error) {
    res.status(500).json({ message: "DB Error" });
  }
});

export default router;
