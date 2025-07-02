# Todo Task Management Web Application
**This project is a part of a hackathon run by
https://www.katomaran.com**
## Features

- Social Login with Google and GitHub
- Full CRUD operations for tasks
- Share tasks with other users via email
- Real-time updates using Supabase Realtime
- Responsive design for all devices
- Advanced task filtering and sorting

## Tech Stack

**Frontend**:
- React.js
- Tailwind CSS
- React Query for data fetching

**Backend Services**:
- Supabase (Authentication, Database, Realtime)
- PostgreSQL database

**Deployment**:
- Frontend hosted on Vercel
- Backend powered by Supabase

## System Architecture

```mermaid
graph TD
    A[React Frontend] -->|REST API| B[Supabase]
    B --> C[(PostgreSQL Database)]
    B --> D[Authentication]
    D --> E[Google OAuth]
    D --> F[GitHub OAuth]
    A -->|WebSocket| G[Realtime Updates]



