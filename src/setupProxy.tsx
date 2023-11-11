import { createProxyMiddleware } from 'http-proxy-middleware';

export default function setupProxy(app: any) {
  app.use(
    '/',
    createProxyMiddleware({
      target: 'http://localhost:5000', // URL of your Node.js server
      changeOrigin: true,
    })
  );
}
