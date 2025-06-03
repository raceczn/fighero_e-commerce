# 🦸‍♂️ Fighero – The Ultimate Action Figure E-commerce Platform

**Fighero** (from *"Fig"* for *figure* and *"Hero"*) is a full-featured, modern e-commerce platform tailored for fans, collectors, and enthusiasts of action figures and collectible merchandise. It offers a wide range of items—from anime and superhero figures to exclusive collectibles and trading cards—sourced from various reputable brands and creators.

Fighero is built with performance, scalability, and user experience in mind, combining a headless architecture with powerful modern technologies to deliver a smooth, fast, and secure shopping experience.

---

## 🛍️ What You Can Buy

- Anime figures (e.g., Naruto, One Piece, Demon Slayer)
- Marvel & DC superheroes (e.g., Iron Man, Batman, Spider-Man)
- Collectible cards and limited-edition sets
- Hirono and other niche collector items
- Variants by brand, size, rarity, and packaging

---

## 💡 Key Highlights

- ⚡ **Fast and responsive interface** for seamless shopping
- 🛒 **Add to Cart & Checkout** for seamless shopping experience with dynamic pricing and quantity management.
- 🔐 **Secure Stripe integration** for hassle-free payments
- 🧾 **Invoices** for users receive detailed invoices for every order.

- ❤️ **Wishlist** for saving favorite items to view or purchase later.

- 📦 **Order Tracking** for viewing current order status and history from the user dashboard.
- 👤 **Clerk-powered user auth** for login and account management
- 🧾 **CMS-powered content** via Sanity for easy admin editing. Developers can use GROQ queries to fetch content in real time and perform CRUD operations.
- 🖼️ **Dynamic product listings**, search, and category filters

---

## Tech Stack Overview

### Frontend 

| Tech          | Description                                               |
|---------------|-----------------------------------------------------------|
| **React**     | UI library for building reusable components               |
| **Next.js**   | Framework for SSR, routing, and optimized performance     |
| **TypeScript**| Adds strong typing for safer, scalable development        |
| **Tailwind CSS** | Utility-first styling for responsive design            |
| **Clerk**     | Handles user authentication and profile management       |

### Backend 

| Tech          | Role                                                      |
|---------------|-----------------------------------------------------------|
| **Sanity**    | Primary database and  a headless CMS for storing product data, categories, brands, users and more. Sanity provides structured content with real-time updates using GROQ and webhooks. |
| **Stripe**    | Payment gateway for processing secure transactions        |
| **Node.js**   | Server-side logic and API handling via Next.js API routes |

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### 1. Clone the Repository
```bash
  git clone <https://github.com/raceczn/fighero_e-commerce.git>
```
### 2. Install dependencies
```bash
   npm install
```
### 3. Run the Server.
```bash
   npm run dev
```
### 4. Make .env.local in folder
```bash
   Nasa gc 'yung content for keys neto, copy lang.
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



### 5. Go to CMD to start the Stripe for development
```bash
stripe listen --forward-to localhost:3000/api/webhook
```
