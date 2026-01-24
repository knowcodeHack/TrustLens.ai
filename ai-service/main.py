from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import datetime
import uvicorn
import hashlib

app = FastAPI()

# Simple persistent model for MVP
model = IsolationForest(contamination=0.05, random_state=42)
is_trained = False

# Dummy training data to initialize the model
initial_data = pd.DataFrame([
    {"hour": h, "event_type": 0, "ip_hash": 0} for h in range(24)
])
model.fit(initial_data)

class LogEvent(BaseModel):
    eventType: str
    userId: str
    ip: str
    location: str
    timestamp: str = None
    metadata: dict = None

def get_hour(ts_str):
    try:
        if ts_str:
            return datetime.datetime.fromisoformat(ts_str.replace("Z", "+00:00")).hour
        return datetime.datetime.now().hour
    except:
        return datetime.datetime.now().hour

def hash_string(s):
    return int(hashlib.md5(s.encode()).hexdigest(), 16) % 1000

@app.post("/ai/score")
async def score_log(event: LogEvent):
    # Feature Engineering
    hour = get_hour(event.timestamp)
    event_type_hash = hash_string(event.eventType)
    ip_hash = hash_string(event.ip)
    
    features = pd.DataFrame([[hour, event_type_hash, ip_hash]], columns=["hour", "event_type", "ip_hash"])
    
    # Isolation Forest returns -1 for anomalies and 1 for normal
    # decision_function returns a score where lower is more anomalous
    score = model.decision_function(features)[0]
    
    # Normalize score to 0-1 (approximate)
    # Typically scores range from -0.5 to 0.5. Let's map it.
    anomaly_score = float(np.clip((0.5 - score) / 0.5, 0, 1))
    
    severity = "low"
    explanation = "Normal activity detected."
    
    if anomaly_score > 0.8:
        severity = "critical"
        explanation = f"Critical anomaly: Unusual {event.eventType} at {hour}:00 from {event.ip}"
    elif anomaly_score > 0.6:
        severity = "high"
        explanation = f"High risk: Unusual pattern detected for {event.userId}"
    elif anomaly_score > 0.4:
        severity = "medium"
        explanation = "Moderate deviation from normal behavior"

    return {
        "anomalyScore": anomaly_score,
        "severity": severity,
        "explanation": explanation
    }

@app.post("/ai/train")
async def train_model(logs: list[LogEvent]):
    global model, is_trained
    
    if not logs:
        raise HTTPException(status_code=400, detail="No logs provided")
        
    data = []
    for log in logs:
        data.append({
            "hour": get_hour(log.timestamp),
            "event_type": hash_string(log.eventType),
            "ip_hash": hash_string(log.ip)
        })
    
    df = pd.DataFrame(data)
    model.fit(df)
    is_trained = True
    
    return {"message": "Model trained successfully", "samples": len(logs)}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
