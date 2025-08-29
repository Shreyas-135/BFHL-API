# BFHL API

This is the Node.js (Express) solution for the VIT Full Stack Question Paper.

## Run Locally

```bash
npm install
npm run dev
```

Then test with:

```bash
curl -X POST http://localhost:3000/bfhl   -H "Content-Type: application/json"   -d '{"data":["a","1","334","4","R","$"]}'
```

## Deploy

- Push to GitHub
- Deploy on Railway/Render/Heroku
- Ensure the route `/bfhl` works and returns status 200
