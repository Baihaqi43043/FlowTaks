# React + Go Full Stack App

Aplikasi full-stack sederhana menggunakan React untuk frontend dan Go untuk backend, dengan MongoDB sebagai database.

## Fitur

- Frontend React dengan Tailwind CSS
- Backend Go dengan Gin Framework
- Database MongoDB
- CORS enabled
- RESTful API
- Form handling
- Error handling
- Loading states

## Teknologi yang Digunakan

### Frontend
- React
- Axios
- Tailwind CSS
- @tailwindcss/forms
- @tailwindcss/typography
- @tailwindcss/aspect-ratio

### Backend
- Go
- Gin Framework
- MongoDB Driver
- CORS middleware

## Cara Menjalankan

### Prerequisites
- Node.js
- Go
- MongoDB

### Setup Backend
```bash
cd backend
go mod tidy
go run cmd/main.go
```

### Setup Frontend
```bash
cd frontend
npm install
npm start
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

## Struktur Proyek

```
.
├── README.md
├── backend/
│   ├── cmd/
│   │   └── main.go
│   ├── internal/
│   │   ├── config/
│   │   ├── handlers/
│   │   └── models/
│   └── go.mod
└── frontend/
    ├── public/
    ├── src/
    ├── package.json
    └── tailwind.config.js
```

## Kontribusi

Silakan buat issue atau pull request jika ingin berkontribusi.

## Lisensi

MIT License 