# Product Management Backend

Express app for managing realtime prouduct and authentication.

**Quick summary**:

- **Language:** TypeScript
- **Runtime:** Node.js / Bun (optional - Development only)
- **Entry:** `src/index.ts`

**Prerequisites**:

- Node.js (v18+) or Bun installed
- `npm` or `bun` available for installing dependencies

**Environment variables**
Create a `.env` file in the project root (this project uses `dotenv`). Example:

```env
PORT = 
JWT_SECRET = 
FIREBASE_API_KEY = 
FIREBASE_AUTH_DOMAIN = 
FIREBASE_PROJECT_ID = 
FIREBASE_STORAGE_BUCKET = 
FIREBASE_MESSAGE_SEND_ID = 
FIREBASE_APP_ID = 
```
**Install dependencies**

- Using npm:

```bash
npm install
```

- Using Bun (recommended if you have Bun installed):

```bash
bun install
```

**Run (development)**

- There's a dev script in `package.json` that uses Bun's watch mode:

```bash
npm run dev
```

Note: The `dev` script runs `bun --watch src/index.ts`. If you don't have Bun installed, either install Bun or run the server with another tool (for example `ts-node` or compile with `tsc` and run with `node`).

**Build and run (production-like)**

```bash
npm run start    # runs `tsc` to compile into `dist/`
node dist/index.js
```

**Project structure (key files)**

- `src/index.ts` — application entry and routes mounting
- `src/lib/secret.ts` — central secrets/config (reads `PORT` and `jwt_secret`)
- `src/routes/auth.ts` — authentication routes and cookie behavior
- `src/utils/jwt.ts` — helper using `jose` (reads `JWT_SECRET_KEY`)
