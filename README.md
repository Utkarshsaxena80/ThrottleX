# ThrottleX 

This repository contains an Express.js-based backend service that implements user-specific API rate limiting using Redis and Prisma (with PostgreSQL).

## Features

* 🔐 **JWT Authentication**: Secures endpoints using Bearer tokens.
* 📦 **Prisma ORM**: Efficient and type-safe database operations.
* ⚡ **Redis Caching**: Tracks API usage per user and enforces rate limits.
* 📊 **Custom Rate Limits**: Each developer can define their own per-user request limit.

---



---

## 🛠️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/api-rate-limiter.git
cd api-rate-limiter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the root directory with the following:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<db>
REDIS_URL=redis://localhost:6379
JWT_SECRET=<your-secret-key>
```

### 4. Run Prisma migrations

```bash
npx prisma migrate dev --name init
```

### 5. Start the development server

```bash
npm run dev
```

---

## 🧪 Example Request Flow

### 🔄 User Signup/Login (not included in code snippet)

* Generates JWT token with email and other details.

### 🧾 Add API for a developer

```http
POST /add-api
Headers:
  Authorization: Bearer <jwt-token>
Body:
  {
    "apiName": "WeatherAPI",
    "apiUse": "Provides weather forecasts"
  }
```

### 📈 Log an API Request

```http
POST /main-entry
Headers:
  Authorization: Bearer <developer-token>
Body:
  {
    "userId": "user123",
    "apiName": "WeatherAPI"
  }
```

Returns:

* `200 OK`: if under limit
* `429 Too Many Requests`: if limit exceeded

---

## 🧠 Logic Overview

* If the user's key is not found in Redis:

  * Fetch the developer's `totalLimit` from PostgreSQL.
  * Create a Redis key with `totalCount = 1` and `EX = 6000 seconds`.
* If the key exists:

  * Parse the existing count.
  * If `totalCount >= maxLimit`, block the request.
  * Else, increment the count and update TTL.

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss your proposed changes.

---

## 📜 License

[MIT](LICENSE)
