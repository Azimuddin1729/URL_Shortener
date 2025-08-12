# 🔗 URL Shortener

A simple and efficient **URL Shortener** application built with **Node.js (Express)** for the backend, **Redis** for fast storage, and **Next.js** for the frontend.

---

## 🚀 Features

- Shorten any URL into a unique, compact link.
- Base62 encoding for cleaner short URLs.
- Redis-powered backend for ultra-fast storage & retrieval.
- REST API for programmatic URL shortening.
- Responsive UI built with Next.js + Tailwind CSS.
- Clickable short URLs that redirect to the original page.

---

## 🛠️ Tech Stack

**Backend**
- Node.js & Express
- Redis (in-memory key-value store)
- Base62 algorithm for ID generation

**Frontend**
- Next.js (React framework)
- Tailwind CSS for styling
- Axios for API calls

---

## ⚡ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

### 2️⃣ Install dependencies
Backend
```bash
cd backend
npm install

```
Frontend

```bash
cd ../frontend
npm install
```

### 3️⃣ Start Redis
Make sure you have Redis installed & running locally(or use Docker):

```bash
redis-server
```

### 4️⃣ Run the backend
```bash
cd backend
node src/index.js
```
Backend runs at: http://localhost:3001

### 5️⃣ Run the frontend
```bash
cd frontend
npm run dev
```
Frontend runs at: http://localhost:3000
