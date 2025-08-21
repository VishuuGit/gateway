require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

const productServiceUrl = process.env.PRODUCT_SERVICE_URL; // e.g. https://product-service-gold.vercel.app/products
const searchServiceUrl = process.env.SEARCH_SERVICE_URL;   // e.g. https://search-service-lac.vercel.app/search

// Health check / root
app.get('/', (req, res) => {
  res.send(`🚀 API Gateway is running. 
    Routes: 
    /products -> ${productServiceUrl}
    /search   -> ${searchServiceUrl}`);
});

// Proxy routes
app.use('/products', createProxyMiddleware({
  target: productServiceUrl,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    // remove "/products" from gateway and forward full URL from .env
    return path.replace(/^\/products/, '');
  }
}));

app.use('/search', createProxyMiddleware({
  target: searchServiceUrl,
  changeOrigin: true,
  pathRewrite: (path, req) => {
    return path.replace(/^\/search/, '');
  }
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
