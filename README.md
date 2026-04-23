## AI Real Chat - Backend

Backend API server for AI Real Chat built with Node.js, Express, MongoDB, Socket.IO, Google OAuth, Gemini API, and Razorpay.

## Live URL
https://ai-realtime-chat-backend-4r7n.onrender.com

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- Passport.js
- Google OAuth
- JWT Authentication
- Google Gemini API
- Razorpay

---

## Features

- Google OAuth Authentication
- JWT Token Generation
- Real-time Chat with WebSockets
- Save Messages in Database
- AI Smart Reply Suggestions
- Razorpay Payment Integration
- Premium User Upgrade
- Live Premium Status Updates

---

## Project Structure

```bash
controllers/
routes/
services/
models/
config/
middlewares/
sockets/
```

## Environment Variables

#Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
FRONTEND_URL=https://your-frontend-url.vercel.app
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GEMINI_API_KEY=your_gemini_api_key
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

# How to Write in an MD File

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Server Runs On:
- [http://localhost:5000](http://localhost:5000)

## Production Start

```bash
npm start
```

## Core Modules
### Authentication Module
Handles:
- Google Login
- Find or Create User
defaults to JWT Token Generation.
### Chat Module
Handles:
- Send Message
- Receive Message
- Load Chat History 
- Sidebar Conversations 
### Socket Module 
Handles events:
- send_message 
- receive_message 
- check_premium 
- get_suggestions 
### AI Module 
Integrated with Google Gemini API for:
- Smart Reply Suggestions 
### Payment Module 
Razorpay Flow:
1. Create Order  
2. Verify Payment  
3. Upgrade User to Premium  
4. Emit Real-Time Premium Update  

## Example API Routes
### Auth Routes
- auth/google 
- auth/google/callback  
defaults to /auth/google and /auth/google/callback.
### Message Routes
- a/api/messages/sidebar 
- a/api/messages/:userId  
defaults to /api/messages/sidebar and /api/messages/:userId.
### Payment Routes
- a/api/payment/create-order
- a/api/payment/verify  
defaults to /api/payment/create-order and /api/payment/verify.

## Database Models
| Model | Fields |
|---|---|
| User | name, email, avatar, googleId, isPremium |
defaults to the following fields.
| Message | senderId, receiverId, message, createdAt |
details of each model are provided.

## Future Improvements

- Group chat rooms
- Fie upload
- Read receipts
- Messages reactions
- Redis for socket scaling
- Admindashboard
