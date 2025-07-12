// swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

export const swaggerSpec = swaggerJsdoc({  // ← ✅ export 추가
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'SUI Marketplace API',
        version: '1.0.0',
        description: 'SUI Marketplace 관련 API 문서',
      },
      servers: [{ url: 'http://localhost:3000' }],
    },

    apis: [path.resolve(__dirname, '../routes/*.js')],
  });
