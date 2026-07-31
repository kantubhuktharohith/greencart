# GreenCart (Minicart) 🛒

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express, React, Node.js). GreenCart provides a seamless shopping experience with a visually appealing interface, secure authentication, product management, and an integrated seller dashboard.

## 🌟 Key Features

- **User Authentication**: Secure JWT-based authentication with local storage persistence, ensuring cross-device support (including mobile).
- **Product & Cart Management**: Browse products, add items to the cart, and manage quantities.
- **Order Tracking**: Visual Amazon-style order tracking stepper in the user dashboard.
- **User Profiles**: Manage personal information, phone numbers, and delivery locations.
- **Seller Dashboard**: Dedicated portal for sellers to log in, manage inventory, and track customer orders.
- **Secure Payments**: Integrated with Stripe for seamless checkout.
- **Image Uploads**: Cloudinary integration for handling product images via Multer.
- **Responsive Design**: Built with Tailwind CSS to ensure a great experience on both desktop and mobile devices.

## 🛠️ Tech Stack

### Frontend
- **React 19** (with Vite)
- **Tailwind CSS 4**
- **React Router v7**
- **Axios** (API requests)
- **React Hot Toast** (Notifications)

### Backend
- **Node.js & Express 5**
- **MongoDB & Mongoose**
- **JSON Web Tokens (JWT)** & **Bcrypt.js** (Auth & Security)
- **Stripe** (Payment Processing)
- **Cloudinary & Multer** (Image Handling)

## 🚀 Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (Atlas or local)
- Cloudinary Account
- Stripe Account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd greencart
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../client
   npm install
   ```

### ⚙️ Environment Variables

Create a `.env` file in the `server` directory and add the following required variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Setup
STRIPE_SECRET_KEY=your_stripe_secret_key
```

Create a `.env` file in the `client` directory for the frontend URL:
```env
VITE_API_URL=http://localhost:5000
```

### 🏃‍♂️ Running the Application Locally

1. **Start the Backend Server**
   ```bash
   cd server
   npm run server
   ```
   *(The backend server will run with nodemon)*

2. **Start the Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```

## 🌐 Deployment

This application is ready to be deployed on platforms like **Vercel**. 
When deploying, make sure to:
- Add all required environment variables in your deployment platform's dashboard.
- Update any CORS configurations if necessary.
- Ensure the build command `npm run build` is executed for the frontend.