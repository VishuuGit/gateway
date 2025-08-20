require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 4000;

const productServiceUrl = process.env.PRODUCT_SERVICE_URL;
const searchServiceUrl = process.env.SEARCH_SERVICE_URL;

// Proxy routes
app.use('/products', createProxyMiddleware({
  target: productServiceUrl,
  changeOrigin: true
}));

app.use('/search', createProxyMiddleware({
  target: searchServiceUrl,
  changeOrigin: true
}));

app.listen(PORT, () => {
  console.log(`🚀 API Gateway running on port ${PORT}`);
  console.log(`➡️  /products -> ${productServiceUrl}`);
  console.log(`➡️  /search   -> ${searchServiceUrl}`);
});
