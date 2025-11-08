# Hackathon_2026 — backend (dev scaffold)

This is a small development scaffold implementing the endpoints listed in `server/backend.txt`.
It's intended for local development and testing only — it uses in-memory stores and plaintext passwords.

Endpoints implemented (base path: http://localhost:3001/api):

- POST /chat        -> { prompt, file? }  (returns a placeholder reply)
- GET  /glossary    -> returns a glossary dictionary
- GET  /articles    -> returns a list of related article links
- GET  /profile/:userID -> returns a sample user profile
- POST /signup      -> { username, password } -> creates a demo user (in-memory)
- POST /login       -> { username, password } -> returns a simple token placeholder

How to run (PowerShell):

```powershell
cd .\server
npm install
npm run dev
```

Example requests (PowerShell using curl):

```powershell
# Signup
curl -X POST http://localhost:5173/api/signup -H 'Content-Type: application/json' -d '{"username":"alice","password":"pass"}'

# Login
curl -X POST http://localhost:5173/api/login -H 'Content-Type: application/json' -d '{"username":"alice","password":"pass"}'

# Get glossary
curl http://localhost:5173/api/glossary

# Chat (POST)
curl -X POST http://localhost:5173/api/chat -H 'Content-Type: application/json' -d '{"prompt":"Summarize this text"}'
```

Notes / next steps:
- Replace in-memory storage with a real DB (SQLite/Postgres/Mongo) for production.
- Add proper password hashing (bcrypt) and JWT-based authentication for protected endpoints.
- Wire the chat endpoint to a real AI service and handle file uploads/streaming as needed.
