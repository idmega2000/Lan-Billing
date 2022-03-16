import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import envData from '../../configs/envData';

dotenv.config();
const { PORT } = envData;
const swaggerDefinition = {
  info: {
    title: 'Project title',
    version: '1.0.0',
    description: 'description',
    contact: {
      name: '',
      url: ''
    }
  },
  host: `localhost:${PORT}`,
  basePath: '/api/v1',
  consumes: 'application/json',
  produces: 'application/json',
  schemes: { HTTP: 'HTTP', HTTPS: 'HTTPS' },
  securityDefinitions:
    {
      Bearer:
      { type: 'apiKey', name: 'Authorization', in: 'header' }
    },
  security: { Bearer: [] }
};

const options = { swaggerDefinition, apis: ['./server/docs/**/*.yaml'] };
const swaggerConfig = swaggerJSDoc(options);

export default swaggerConfig;
