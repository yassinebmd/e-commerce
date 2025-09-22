# E‑Commerce (MERN)
## Tech Stack
- Backend: Node.js, Express, Mongoose, JWT, bcrypt, CORS, dotenv
- Frontend: React 18, Vite, React Router, MUI (Material UI)
- Database: MongoDB
- Language/Module: ES Modules

## Features
- User registration and login with hashed passwords and JWT tokens
- Product listing (seeded if DB is empty)
- Cart management: add/update/remove items, clear cart
- Checkout flow that creates orders from cart items
- Protected routes on the backend using a JWT middleware

## Monorepo Structure
```
backend/
  src/
    index.js                 # Express app bootstrap
    middlewares/validateJWT.js
    Models/                  # Mongoose models (Product, User, Cart, Order)
    routers/                 # Express routers (user, products, cart)
    services/                # Business logic (user, product, cart)
frontend/
  src/
    pages/                   # React pages (home, cart, login, register, checkout, etc.)
    components/              # UI components (navbar, productsCard, etc.)
    context/                 # Auth + Cart contexts/providers
```

## Prerequisites
- Node.js 18+
- MongoDB instance (local or cloud)

## Environment Variables
Create a `.env` file in `backend/` with:
```
DATA_BASE_URL=mongodb://localhost:27017/your_db_name
JWT_SECRET=some_long_random_secret
```

Notes:
- `DATA_BASE_URL` is used by Mongoose to connect.
- `JWT_SECRET` is used to sign/verify JWTs.

## Install & Run
From the repo root, install dependencies for both apps:

```bash
cd backend && npm install && cd ../frontend && npm install
```

Run the backend (default http://localhost:5001):
```bash
cd backend
npm run start
```

Run the frontend dev server:
```bash
cd frontend
npm run dev
```

## Backend Scripts
- `npm run start` — start Express with nodemon (watches `src/index.js`).

## Frontend Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## API Overview
Base URL: `http://localhost:5001`

### Auth Routes (`/user`)
- `POST /user/register`
  - Body: `{ firstname, lastname, email, password }`
  - Response: `{ token }` (JWT) on success or message on failure
- `POST /user/login`
  - Body: `{ email, password }`
  - Response: `{ token }` on success or error message on failure
- `GET /user/orders` (protected)
  - Headers: `Authorization: Bearer <token>`
  - Response: list of orders for the authenticated user

### Product Routes (`/products`)
- `GET /products`
  - Response: array of products
  - Products are auto‑seeded on server start if DB is empty

### Cart Routes (`/cart`)
All cart endpoints require `Authorization: Bearer <token>`.

- `GET /cart`
  - Returns the active cart for the user (with populated product details)
- `POST /cart/items`
  - Body: `{ productID, quantité }`
  - Adds a product to the cart; fails if already exists or stock is low
- `PUT /cart/items`
  - Body: `{ productID, quantité }`
  - Updates quantity and recalculates totals
- `DELETE /cart/items/:productid`
  - Removes a product from the cart
- `DELETE /cart`
  - Clears all cart items
- `POST /cart/checkout`
  - Body: `{ adress }`
  - Creates an order from the cart and marks cart as completed

## Data Models (Simplified)
- Product: `{ title, image, price, stock }`
- User: `{ firstname, lastname, email, passwordHash }`
- Cart: `{ userId, items: [{ product, quantité, unitprice }], totalamont, status }`
- Order: `{ orderItems: [{ productTitle, productImage, unitprice, quantité }], total, adress, userId }`

## Authentication
- After `register` or `login`, store the returned JWT on the client (e.g., localStorage) and send it in the `Authorization` header for protected endpoints: `Authorization: Bearer <token>`.

## Frontend
- Built with React + Vite and Material UI.
- Uses `context` for auth and cart state (`authContext`, `cartContext`).
- Pages include `home`, `cart`, `checkout`, `login`, `register`, `myorder`, etc.

## Development Notes
- The server seeds sample products on startup via `seedProducts()`.
- Ensure MongoDB is running and `.env` variables are set before starting the backend.
- Ports: Backend `5001`; Frontend uses Vite’s default (shown in terminal on start).

## Roadmap / Ideas
- Add product search and categories
- Add stock decrement on checkout
- Add payment integration
- Add admin dashboard for product management

## License
MIT (or your choice)
