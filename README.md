# BFHL API

This is the Node.js (Express) solution for the Bajaj Full Stack Question Paper.

## Run Locally

```bash
npm install
npm run dev
```

Then test with:

```bash
curl -X POST https://bfhl-api-1-cvcn.onrender.com/bfhl  -H "Content-Type: application/json"   -d '{"data":["a","1","334","4","R","$"]}'
```

## Deploy
Push to GitHub
```
Deploy on Render
```
Ensure the route `/bfhl` works and returns status 200
