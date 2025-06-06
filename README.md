# back

# 📊 Chapter Performance Dashboard – Backend API

A fully RESTful backend API for MathonGo's Chapter Performance Dashboard, developed as part of a backend developer task. This API allows uploading chapter data via JSON, retrieving chapters with filters and pagination, rate-limiting via Redis, and caching for performance.

---

## 🚀 Live API (Deployed on Render)

> 🌐 Base URL:  
[`https://back-12er.onrender.com`](https://back-12er.onrender.com)

**Important:** This base URL will return "Cannot GET /" when accessed directly.  
To view data, use endpoints like:

- [`GET /api/v1/chapters`](https://back-12er.onrender.com/api/v1/chapters)

---

## 📮 Postman Collection (Public)

🔗 [Click to Open Collection in Postman](https://api.postman.com/collections/31980620-7c5da6f9-b0fe-45a8-9faa-74cff37b5105?access_key=PMAT-01JX0TFFZJXCNG40A5GSDZ6RMK)

Includes:
- POST file upload request
- GET all chapters
- GET filtered chapters
- GET chapter by ID

---

## ⚙️ Tech Stack

- **Node.js**, **Express.js**
- **MongoDB + Mongoose**
- **Redis** (for caching & rate-limiting)
- **Multer** (for file uploads)
- **Helmet**, **CORS**, **dotenv**

---

## 📂 Features Implemented

✅ Upload `.json` chapter data via POST (admin-only)  
✅ Filter chapters by class, subject, unit, status, weakChapters  
✅ Pagination using `page` and `limit`  
✅ Redis-based caching of GET results (1 hour)  
✅ Cache invalidation on new upload  
✅ Rate limiting: 30 requests per minute per IP (Redis-backed)  
✅ Environment variables secured via `.env`  
✅ Deployed on **Render**

---

## 📘 API Endpoints

### `POST /api/v1/chapters`

> Upload JSON file containing chapters (admin-only route)

**Request Type**: `multipart/form-data`  
**Key**: `file` (type: File)

---

### `GET /api/v1/chapters`

> Retrieve all chapters (with optional filters)

**Query Parameters (optional):**

| Param         | Type   | Description                      |
|---------------|--------|----------------------------------|
| `class`       | String | e.g. `Class 11`                  |
| `unit`        | String | e.g. `Algebra`                   |
| `subject`     | String | e.g. `Math`                      |
| `status`      | String | `Completed`, `In Progress`, etc |
| `weakChapters`| Boolean| `true` or `false`                |
| `page`        | Number | Pagination page (default: 1)     |
| `limit`       | Number | Results per page (default: 10)   |

---

### `GET /api/v1/chapters/:id`

> Retrieve a specific chapter by ID.

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<dbname>?retryWrites=true&w=majority
REDIS_URL=redis://default:<password>@<redis-host>:<port>
