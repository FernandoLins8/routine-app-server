import "reflect-metadata"
import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import router from './routes'
import AppError from "./errors/AppError";

import swaggerFile from './swagger.json';

const app = express()

app.use(cors())
app.use(express.json())
app.use(router)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3333, () => console.log('HTTP server running!'))

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});
