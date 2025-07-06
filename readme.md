# Parlour Admin Dashboard

A full-stack web application for managing parlour employees, attendance, tasks, and admin users. Built with **Next.js** (frontend) and **Express.js** (backend), using MongoDB for data storage.

---

## Features

- Employee management (CRUD)
- Attendance tracking and logs
- Task assignment and management
- Admin and SuperAdmin roles
- Authentication and authorization
- Responsive dashboard UI

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Express.js, Node.js, MongoDB
- **Integration:** RESTful endpoints, WebSocket for real-time updates
- **Auth:** JWT, cookies

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB database (Atlas)

### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/anmolkhurana490/parlour-admin-dashboard.git
cd Parlour_Admin_Dashboard
```

#### 2. Install dependencies

```bash
# For frontend
cd frontend-parlour-dashboard
npm install

# For backend
cd ../backend-parlour-api
npm install
```

#### 3. Configure environment variables

Create a `.env` file in `backend-parlour-api`:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

#### 4. Run the backend

```bash
cd backend-parlour-api
npm run dev
```

#### 5. Run the frontend

```bash
cd ../frontend-parlour-dashboard
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
Parlour_Admin_Dashboard/
├── backend-parlour-api/      # Express.js backend
├── frontend-parlour-dashboard/ # Next.js frontend
└── readme.md
```

---

## License

This project is for educational purposes.

---

## Credits

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
