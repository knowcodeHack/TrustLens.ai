## Project Summary
TrustLens.ai is a comprehensive full-stack SaaS platform designed for startups to monitor security logs, detect anomalies using AI, and manage compliance readiness (SOC2/HIPAA). It provides real-time alerting, behavioral modeling, and automated report generation.

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js (Express) with PostgreSQL (Supabase)
- **AI Service**: Python FastAPI with Scikit-learn (Isolation Forest)
- **Real-time/Queue**: Redis Streams
- **Authentication**: NextAuth (Credentials + Google)
- **Charts**: Recharts
- **Deployment**: Docker & Docker Compose

## Architecture
- `src/`: Next.js frontend and shared logic.
- `backend/`: Express API for log ingestion and alert management.
- `ai-service/`: Python service for ML-based anomaly scoring.
- `database/`: Managed PostgreSQL via Supabase.
- `redis/`: Used for asynchronous processing and real-time alert streams.

## User Preferences
- Dark mode by default.
- Premium minimal UI using shadcn components.
- Responsive design for all dashboard pages.

## Project Guidelines
- All log ingestion should go through `POST /api/v1/ingest/logs`.
- AI scoring is mandatory for every ingested log.
- Anomalies with score > 0.6 must trigger a Redis Stream event.

## Common Patterns
- **Ingestion Flow**: Client -> Express -> AI Service -> PostgreSQL -> Redis -> Frontend (Socket/Polling).
- **Security**: NextAuth protected routes for `/app/*`. API Key validation for `/api/v1/ingest/*`.
