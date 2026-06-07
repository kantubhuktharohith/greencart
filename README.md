# 🛒 GreenCart (MiniCart)

A modern full-stack e-commerce platform built using the **MERN Stack** (MongoDB, Express.js, React, and Node.js). GreenCart delivers a seamless online shopping experience with secure authentication, product management, order tracking, payment integration, and a dedicated seller dashboard.

---

## 🚀 Features

### 👤 User Features

* Secure JWT-based authentication and authorization
* Persistent login sessions using local storage
* Browse and search products
* Add, update, and remove items from the shopping cart
* Place orders with secure Stripe payments
* Track orders with an Amazon-style order progress tracker
* Manage profile information, delivery addresses, and phone numbers
* Responsive design optimized for desktop, tablet, and mobile devices

### 🛍️ Seller Features

* Dedicated seller authentication portal
* Product inventory management
* Product image uploads via Cloudinary
* View and manage customer orders
* Dashboard for monitoring store activity

### 💳 Payment & Security

* Secure Stripe payment gateway integration
* Password encryption using Bcrypt.js
* JWT-based authentication and protected routes
* Secure API communication

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS 4
* React Router v7
* Axios
* React Hot Toast

### Backend

* Node.js
* Express.js 5
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* Bcrypt.js

### Third-Party Services

* Stripe (Payment Processing)
* Cloudinary (Image Storage)
* Multer (File Upload Handling)

---

## 📁 Project Structure

```bash
greencart/
│
├── client/          # React Frontend
│
├── server/          # Express Backend
│
└── README.md
```

---

## ⚙️ Prerequisites

Before running the project, ensure you have:

* Node.js (Latest LTS Version)
* MongoDB Atlas or Local MongoDB Instance
* Cloudinary Account
* Stripe Account

---

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/greencart.git

cd greencart
```

### 2. Install Backend Dependencies

```bash
cd server

npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client

npm install
```

---

## 🔐 Environment Variables

### Backend (`server/.env`)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Frontend (`client/.env`)

```env
VITE_API_URL=http://localhost:5000
```

---

## ▶️ Running the Application

### Start Backend Server

```bash
cd server

npm run server
```

Backend runs on:

```bash
http://localhost:5000
```

### Start Frontend Development Server

```bash
cd client

npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

## 💳 Payment Workflow

1. User adds products to the cart.
2. Checkout is initiated.
3. Stripe securely processes the payment.
4. Order details are stored in MongoDB.
5. Users can track order progress from their dashboard.

---

## 📸 Image Management

GreenCart uses:

* Multer for handling file uploads
* Cloudinary for cloud-based image storage and optimization

This ensures fast and reliable product image delivery.

---

## 🌐 Deployment

The application is deployment-ready and can be hosted on:

* Vercel
* Render
* Railway
* DigitalOcean
* AWS

### Deployment Checklist

* Configure all environment variables
* Update production API URLs
* Configure CORS settings
* Build frontend assets

```bash
npm run build
```

---

## 🔒 Security Features

* JWT Authentication
* Password Hashing with Bcrypt.js
* Protected Routes
* Secure Payment Processing
* Environment Variable Protection

---

## 📈 Future Enhancements

* Product Reviews and Ratings
* Wishlist Functionality
* Coupon and Discount System
* Admin Analytics Dashboard
* Email Notifications
* Multi-Vendor Marketplace Support

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to the branch

```bash
git push origin feature/your-feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

Developed with ❤️ using the MERN Stack.

If you found this project useful, consider giving it a ⭐ on GitHub.
