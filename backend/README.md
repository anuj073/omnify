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

Protected endpoints use `Authorization: Bearer <accessToken>`.

| Method | Path | Description | Auth |
| --- | --- | --- | --- |
| POST | `/api/auth/register` | Register with name, email, password | No |
| POST | `/api/auth/login` | Login with email and password | No |
| GET | `/api/auth/me` | Current user | Yes |
| GET | `/api/users?search=<name-or-email>` | Search up to 20 users (minimum 2 characters) | Yes |
| POST | `/api/conversations` | Create direct/group conversation; body: `{ "memberIds": ["uuid"], "type": "DIRECT" }` | Yes |
| GET | `/api/conversations` | List current user's conversations | Yes |
| GET | `/api/conversations/:conversationId` | Get conversation details | Yes |
| GET | `/api/messages/:conversationId?limit=30&cursor=<messageId>` | Fetch message history (cursor pagination) | Yes |

## Socket.IO

Connect to the same origin with:

```ts
const socket = io(API_URL, { auth: { token: accessToken } });
```

Client events:

- `join_conversation`: `{ conversationId }`; server verifies membership before joining the room.
- `send_message`: `{ conversationId, content, clientMessageId? }`; message is persisted before `new_message` is broadcast. Use the acknowledgement callback to confirm success.
- `typing_start` / `typing_stop`: `{ conversationId }`; membership is checked before broadcasting.
- `message_delivered`: `{ messageId }`; records the current user's delivery receipt for a message from another member.
- `message_read`: `{ messageId }`; records the current user's read receipt for a message from another member.

Server events:

- `connected`: authenticated user ID.
- `user_online` / `user_offline`: presence transitions (single server instance).
- `new_message`: persisted message and optional client message ID.
- `user_typing` / `user_stopped_typing`: conversation and user IDs.
- `message_receipt_updated`: message ID, user ID, status and receipt timestamp.

## Security and current scope

- Passwords are hashed with bcrypt.
- Access tokens are signed JWTs; current implementation issues short-lived access tokens only. Refresh-token rotation and password reset are not implemented yet.
- REST and Socket.IO enforce conversation membership before reading, joining, sending, or updating receipts.
- User search requires authentication, excludes the current user, limits results to 20, and selects only public profile fields.
- Helmet, configured CORS, JSON size limit, Zod validation, and authentication rate limiting are enabled.
- Online presence is in-memory and only reliable on one backend instance. Use a shared Socket.IO/presence adapter for multi-instance deployments.
- Media uploads, push notifications, group administration, message edit/delete, and end-to-end encryption remain future work. This is not a fully production-hardened messaging service without automated tests, monitoring, deployment review, and additional operational controls.

## Frontend integration

Set the frontend origin in `CLIENT_ORIGIN` and configure its API base URL to the backend origin. Browser production deployments should use a secure HttpOnly cookie session strategy rather than persistent browser storage.
