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
