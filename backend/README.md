# Omnify chat backend

TypeScript + Express 5 + Socket.IO + PostgreSQL + Prisma.

## Requirements

- Node.js 20+
- PostgreSQL 14+
- npm

## Setup

```bash
cd backend
npm install
cp .env.example .env
```

Set `DATABASE_URL` to your PostgreSQL database and replace `JWT_ACCESS_SECRET` with a cryptographically random secret of at least 32 characters. Set `CLIENT_ORIGIN` to the exact frontend origin.

Create the database, then run:

```bash
npx prisma generate
npx prisma migrate dev --name init_chat
npm run dev
```

The API listens on `http://localhost:8000`. Health check: `GET /api/health`.

## REST API

All protected endpoints use `Authorization: Bearer <accessToken>`.

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Register with name, email, password | No |
| POST | `/api/auth/login` | Login with email and password | No |
| GET | `/api/auth/me` | Current user | Yes |
| POST | `/api/conversations` | Create direct/group conversation; body: `{ "memberIds": ["uuid"], "type": "DIRECT" }` | Yes |
| GET | `/api/conversations` | List current user's conversations | Yes |
| GET | `/api/conversations/:conversationId` | Get conversation details | Yes |
| GET | `/api/messages/:conversationId?limit=30&cursor=<messageId>` | Fetch message history (cursor pagination) | Yes |

## Socket.IO

Connect to the same origin with:

```ts
const socket = io(API_URL, { auth: { token: accessToken } });
```

Events from client:

- `join_conversation`: `{ conversationId }`; server verifies membership before joining the room.
- `send_message`: `{ conversationId, content, clientMessageId? }`; message is persisted before `new_message` is broadcast. Use the acknowledgement callback to confirm success.
- `typing_start` / `typing_stop`: `{ conversationId }`; membership is checked before broadcasting.

Events from server:

- `connected`: authenticated user ID.
- `new_message`: persisted message and optional client message ID.
- `user_typing` / `user_stopped_typing`: conversation and user IDs.
- `user_offline`: user ID on disconnect.

Example:

```ts
socket.emit("join_conversation", { conversationId }, (result) => console.log(result));
socket.emit("send_message", { conversationId, content: "Hello" }, (result) => console.log(result));
```

## Security and current scope

- Passwords are hashed with bcrypt.
- Access tokens are signed JWTs; current implementation issues short-lived access tokens only. Refresh-token rotation and password reset are not implemented yet.
- REST and Socket.IO enforce conversation membership before reading/joining/sending.
- Helmet, strict configured CORS, JSON size limit, validation, and authentication rate limiting are enabled.
- Media uploads, push notifications, Redis scaling, group administration, message edit/delete, receipts/read markers, and end-to-end encryption are future work. Do not treat this starter as a fully production-hardened messaging service without those controls, tests, monitoring, and deployment review.

## Frontend integration

The existing frontend runs on Next.js. Configure `CLIENT_ORIGIN=http://localhost:3000`. Keep the JWT in a secure strategy appropriate to your client; for browser production deployments, prefer an HttpOnly, Secure, SameSite cookie design over persistent browser storage.
