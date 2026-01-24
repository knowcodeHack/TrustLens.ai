import { Request, Response } from "express";
import pool from "../db";
import redisClient from "../redis";
import axios from "axios";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

export const ingestLogs = async (req: Request, res: Response) => {
  const apiKey = req.headers["x-api-key"] as string;
  const { eventType, userId, ip, location, timestamp, resource, metadata } = req.body;

  if (!apiKey) {
    return res.status(401).json({ message: "Missing API Key" });
  }

  try {
    // 1. Validate API Key and get Org
    const { rows: orgs } = await pool.query(
      "SELECT id FROM organizations WHERE api_key = $1",
      [apiKey]
    );

    if (orgs.length === 0) {
      return res.status(401).json({ message: "Invalid API Key" });
    }

    const orgId = orgs[0].id;

    // 2. Store log in DB
    const { rows: logs } = await pool.query(
      "INSERT INTO logs (org_id, event_type, user_id, ip, location, timestamp, resource, metadata) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id",
      [orgId, eventType, userId, ip, location, timestamp || new Date(), resource, metadata]
    );

    const logId = logs[0].id;

    // 3. Call AI Service for scoring
    try {
      const aiResponse = await axios.post(`${AI_SERVICE_URL}/ai/score`, {
        eventType,
        userId,
        ip,
        location,
        timestamp,
        metadata
      });

      const { anomalyScore, severity, explanation } = aiResponse.data;

      // 4. Handle Anomaly
      if (anomalyScore > 0.6) {
        const { rows: anomalies } = await pool.query(
          "INSERT INTO anomalies (log_id, org_id, anomaly_score, severity, explanation) VALUES ($1, $2, $3, $4, $5) RETURNING id",
          [logId, orgId, anomalyScore, severity, explanation]
        );

        // Push to Redis Stream for Real-time alerts
        if (redisClient.isOpen) {
          await redisClient.xAdd("security_alerts", "*", {
            orgId,
            logId,
            anomalyId: anomalies[0].id,
            type: eventType,
            severity,
            explanation,
            timestamp: new Date().toISOString()
          });
        }
      }
    } catch (aiError) {
      console.error("AI Service Error:", aiError);
      // Continue even if AI fails, but log it
    }

    res.status(202).json({ message: "Log ingested", logId });
  } catch (error: any) {
    console.error("Ingestion error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
