import express from 'express';
import cors from 'cors';
import userRouter from './routers/userRouter';
import questionRouter from './routers/questionRouter';
import rankingRouter from './routers/rankingRouter';

const app = express();
app.use(express.json());
app.use(cors());

app.use(userRouter);

app.use('/questions', questionRouter);

app.use(rankingRouter);

export default app;
