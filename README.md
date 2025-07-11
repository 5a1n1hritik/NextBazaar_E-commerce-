<div align="center">

# 🛒 **NextBazaar**

A modern, full-stack e-commerce platform built with **Next.js 15**, **MongoDB**, and **Tailwind CSS**, offering a seamless shopping experience, real-time analytics, and a mobile-first design.

[![Live Demo](https://img.shields.io/badge/Live-Demo-green?style=for-the-badge&logo=vercel)](https://nextbazaar.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

</div>

---

## 🧭 Overview

**NextBazaar** provides an intuitive and efficient online shopping experience, featuring product browsing, smart filters, user authentication, shopping cart, order management, and a powerful admin dashboard. Built with performance and scalability in mind.

---

## 🚀 Features

- 🛍️ Product Listing, Categories & Filters  
- 🧺 Shopping Cart & Checkout Flow  
- 👤 Authentication & User Management  
- 🧾 Order History & Summary  
- 📦 Admin Dashboard with Inventory & Analytics  
- 🌗 Light/Dark Theme Support  
- 📱 Mobile Responsive & Touch Friendly  
- 🔐 Form Validation (Zod + React Hook Form)  
- 📊 Sales Charts (Chart.js, Recharts)

---

## 🛠️ Tech Stack

| Layer       | Technology Stack                                                                 |
|-------------|-----------------------------------------------------------------------------------|
| **Frontend** | Next.js 15, React 19, Tailwind CSS, Radix UI, Framer Motion, Zustand             |
| **Backend**  | Next.js App Router (API routes), MongoDB, Mongoose                              |
| **UI & UX**  | TailwindCSS Animate, Lucide, Heroicons, Tabler Icons, Dark Mode Support         |
| **Forms**    | React Hook Form, Zod Validation                                                  |
| **Charts**   | Chart.js, Recharts                                                               |

---

## 📁 Project Structure

```

nextbazaar/
├── app/               # App router (pages, layouts, API handlers)
├── components/        # UI components
├── lib/               # DB connection, auth, utilities
├── public/            # Static files
├── styles/            # Global styles (Tailwind)
├── types/             # TS interfaces and types
├── .env.local         # Environment variables
└── tailwind.config.js # Tailwind setup

````

---

## 🧑‍💻 Getting Started

### ✅ Prerequisites

- Node.js `v18+`
- MongoDB instance (local or Atlas)
- Vercel (for deployment)

### 🔧 Local Setup

1. **Clone the repository:**

```bash
git clone https://github.com/yourusername/nextbazaar.git
cd nextbazaar
````

2. **Install dependencies:**

```bash
npm install
```

3. **Add environment variables:**

Create a `.env.local` file:

```env
MONGODB_URI=your_mongodb_connection_string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. **Run the app:**

```bash
npm run dev
```

> The app will be available at `http://localhost:5173`

---

## ⚙️ Deployment

### 🚀 Deploying to Vercel

1. Push your code to GitHub.
2. Import the repo into [Vercel](https://vercel.com/).
3. Set environment variables in the Vercel dashboard:

   * `MONGODB_URI`
   * `NEXT_PUBLIC_BASE_URL`

> Vercel will auto-detect the Next.js project and handle build & deployment.

---

## 🔍 Testing & Linting

```bash
npm run lint
```

Use **Thunder Client** or **Postman** to test your `/api` routes.

---

## 📦 Packages of Interest

* `mongoose` – MongoDB ORM
* `zustand` – Global state management
* `next-themes` – Dark mode
* `chart.js`, `recharts` – Sales and analytics visualizations
* `react-hot-toast` – Toast notifications
* `framer-motion` – Smooth transitions
* `@hookform/resolvers` + `zod` – Form validation
* `radix-ui` – Headless UI components

---

## 🛡️ License

Licensed under the [MIT License](LICENSE).

---

## 🤝 Contributing

We welcome contributions from the community!

```bash
# Fork the repo
# Create a feature branch
git checkout -b feature/amazing-feature

# Commit your changes
git commit -m "✨ Add amazing feature"

# Push and open a PR
git push origin feature/amazing-feature
```

---

## 🙌 Acknowledgements

* Inspired by modern e-commerce platforms like Flipkart, Amazon, and Shopify
* Thanks to the creators of all open-source tools that power this app

---

<div align="center">

**🛍️ Shop Smart. Build Smart. Explore NextBazaar Today!**

</div>
