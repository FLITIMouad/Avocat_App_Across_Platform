import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors  from 'cors';
import dotenv from "dotenv";
import userRouter from './routes/usersRoute.js';
import caseRouter from './routes/caseRoute.js';
import clientRouter from './routes/clientRouter.js';

dotenv.config();

import middlewares from'./Middleware/errorMiddlewares.js';
import colors from "colors";
import connectDb from "./config/db.js";

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
connectDb();

app.get('/', (req, res) => {
  res.json({
   message: 'Work'
  });
});


app.use('/api/users/auth', userRouter);
app.use('/api/cases', caseRouter);
app.use('/api/clients', clientRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
