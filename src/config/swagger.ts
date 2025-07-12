import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SUI BE API',
      version: '1.0.0',
      description: 'Sui 백엔드 API 문서',
    },
  },
  apis: ['./src/routes/*.ts'], // ✨ 주석으로 API 명세 작성한 파일 경로
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs };
