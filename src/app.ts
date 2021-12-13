import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';
import questionRouter from './routers/questionRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use('/questions', questionRouter);

export default app;
