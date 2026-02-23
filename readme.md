# 🚀 Portfolio Builder (Full-Stack)

A full-stack portfolio generation platform where users can create, customize, and publish interactive developer portfolios using dynamic templates.

Built with a scalable architecture separating frontend and backend for future SaaS expansion.

---

## ✨ Features

- 🔐 User Authentication (JWT-based)
- 🎨 Multiple Portfolio Templates
- 📝 Real-Time Editing & Preview
- 📦 MongoDB Storage (User-based portfolios)
- 🌍 Public Portfolio Links
- 📊 User Dashboard ("Your Portfolios")
- 🛠 Future-ready backend architecture

---

## 🏗 Tech Stack

### Frontend
- React.js
- React Router
- Context API (Authentication)
- Dynamic Template Rendering

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (Password hashing)

---


## ⚙️ Environment Variables

### Backend (`backend/.env`)

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_super_secret_key  

### Frontend (`frontend/.env`)

VITE_API_URL=http://localhost:5000  

---

## 🔐 Authentication Flow

- User registers
- Password is hashed using bcrypt
- JWT is generated on login
- Protected routes require Bearer token
- Portfolios are stored per authenticated user

---

## 🧩 Publishing Flow

1. User selects template  
2. Edits portfolio content  
3. Navigates to Publish Confirmation page  
4. Confirms publish  
5. Portfolio saved in MongoDB with:
   - userId
   - templateId
   - data (JSON block)
   - isPublished: true  
6. Public link generated:

/portfolio/:id  

---

## 📊 Dashboard

The dashboard allows users to:

- View all their published portfolios
- Access public links
- Navigate back to editor
- (Future: Edit/Delete portfolios)

---