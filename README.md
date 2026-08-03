# 🛒 GreenCart (MiniCart)

A modern full-stack e-commerce web application built using the **MERN Stack (MongoDB, Express.js, React, Node.js)**. GreenCart delivers a fast, secure, and responsive online shopping experience with customer and seller portals, secure payments, order management, and an intuitive user interface.

---

## 🚀 Features

### 👤 User Features

* Secure JWT-based user authentication
* Persistent login across browser sessions
* Browse products by category
* Search and filter products
* Add, update, and remove items from cart
* Wishlist support
* User profile management
* Save delivery addresses
* Place orders securely
* Amazon-style order tracking timeline
* Order history dashboard
* Mobile-friendly responsive interface

### 🛍️ Seller Features

* Dedicated seller authentication
* Seller dashboard
* Add new products
* Edit existing products
* Delete products
* Upload product images
* Inventory management
* View and manage customer orders
* Track sales performance

### 💳 Payment System

* Secure Stripe Checkout integration
* Online payment support
* Order confirmation after successful payment

### 🖼️ Image Management

* Cloudinary image hosting
* Multer middleware for image uploads
* Optimized product image delivery

### 📱 Responsive UI

* Fully responsive design
* Desktop, tablet, and mobile support
* Clean and modern shopping experience
* Built using Tailwind CSS

---

# 🛠️ Tech Stack

## Frontend

* React 19
* Vite
* Tailwind CSS 4
* React Router v7
* Axios
* React Hot Toast

## Backend

* Node.js
* Express.js 5
* MongoDB
* Mongoose
* JSON Web Token (JWT)
* Bcrypt.js

## Third-Party Services

* Stripe
* Cloudinary
* Multer

---

# 📂 Project Structure

```text
GreenCart/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── package.json
│   └── server.js
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/your-username/greencart.git

cd greencart
```

---

## Install Backend Dependencies

```bash
cd server

npm install
```

---

## Install Frontend Dependencies

```bash
cd ../client

npm install
```

---

# 🔐 Environment Variables

## Server (.env)

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
```

---

## Client (.env)

```env
VITE_API_URL=http://localhost:5000
```

---

# ▶️ Running the Project

## Start Backend

```bash
cd server

npm run server
```

---

## Start Frontend

```bash
cd client

npm run dev
```

---

# 🌍 Deployment

GreenCart can be deployed on platforms such as **Vercel**, **Render**, or **Railway**.

Before deployment:

* Configure all environment variables.
* Update CORS settings for production.
* Build the frontend using:

```bash
npm run build
```

---

# 🔒 Security

* JWT Authentication
* Password hashing using Bcrypt
* Protected API routes
* Secure payment gateway with Stripe
* Environment variable protection

---

# 📸 Screenshots

Add screenshots of the following pages:

* Home Page
* Product Listing
* Product Details
* Shopping Cart
* Checkout
* User Dashboard
* Order Tracking
* Seller Dashboard
* Admin Product Management

---

# 🎯 Future Improvements

* Product reviews and ratings
* AI-based product recommendations
* Coupon and discount system
* Email notifications
* Live order tracking
* Multi-vendor marketplace
* Dark mode
* Progressive Web App (PWA)
* Inventory analytics dashboard
* Admin panel with detailed reports

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**K. Rohith Kantubhuktha**

Frontend Developer | MERN Stack Developer | React Developer

If you found this project useful, consider giving it a ⭐ on GitHub.
