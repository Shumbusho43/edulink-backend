# EduLink Backend

A simple Node.js/Express backend for EduLink that supports:
- Authentication
- Opportunity posting and listing
- Applications to opportunities
- Basic opportunity/application statistics

## Live API
- Base URL: https://edulink-backend-wvll.onrender.com
- API Documentation (Swagger): https://edulink-backend-wvll.onrender.com/api/documentation

## Tech Stack
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- Swagger UI

## Project Structure
```text
config/          Database connection
controllers/     Request handlers
middleware/      Auth middleware
models/          Mongoose models
routes/          API route definitions
server.js        App entry point
```

## Environment Variables
Create a `.env` file in the project root:

```env
MONGO_URI=mongodb+srv://davidshumbusho10_db_user:dfNSxvYMzCjeKEgx@cluster0.agnis9j.mongodb.net/edulink?retryWrites=true&w=majority
JWT_SECRET=supersecretkey
PORT=2000
```

## Run Locally
1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

Alternative start command:
```bash
node server.js
```

Server default URL:
- http://localhost:2000

## API Routes
All routes are prefixed with `/api`.

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT token
- `GET /api/auth/me` - Get current user (requires token)

### Opportunities
- `GET /api/opportunities` - List opportunities (requires token)
- `POST /api/opportunities` - Create opportunity (requires token)
- `GET /api/opportunities/me` - Get my posted opportunities (requires token)
- `GET /api/opportunities/:id/applications` - Get applications for an opportunity (requires token)

### Applications
- `POST /api/applications` - Apply to opportunity (requires token)
- `GET /api/applications/me` - Get my applications (requires token)
- `PUT /api/applications/:applicationId/decision` - Accept/reject an application (requires token)

### Statistics
- `GET /api/stats` - Get user opportunity/application stats (requires token)

## Auth Header Format
For protected routes, send the token in the `Authorization` header:

```text
Authorization: Bearer <your_jwt_token>
```

## Health Check
- `GET /` returns: `EduLink API Running`
