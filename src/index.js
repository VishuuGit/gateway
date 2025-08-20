require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const productServiceUrl = process.env.PRODUCT_SERVICE_URL;
const searchServiceUrl = process.env.SEARCH_SERVICE_URL;

// Health check / root
app.get('/', (req, res) => {
  res.send("🚀 API Gateway is running. Routes: /products, /search");
});

// Proxy routes
app.use('/products', createProxyMiddleware({
  target: productServiceUrl,
  changeOrigin: true
}));

app.use('/search', createProxyMiddleware({
  target: searchServiceUrl,
  changeOrigin: true
}));

// For local dev only
if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 API Gateway running on port ${PORT}`);
    console.log(`➡️  /products -> ${productServiceUrl}`);
    console.log(`➡️  /search   -> ${searchServiceUrl}`);
  });
}

module.exports = app;
