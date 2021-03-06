import { Request, Response } from 'express';
import * as questionRespository from '../repositories/questionRepository';

interface UserInfoRequest extends Request {
    userId: number;
}

async function createQuestion(req: Request, res: Response) {
  try {
    const {
      question, student, class: group, tags,
    } = req.body;

    if (!question || !student || !group || !tags) return res.sendStatus(400);

    const id = await questionRespository.createQuestion({
      question, student, group, tags,
    });

    if (id === null) {
      return res.sendStatus(422);
    }

    res.status(201).send({ id });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function findQuestionByID(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const question = await questionRespository.findQuestionByID(id);

    if (question === null) {
      return res.sendStatus(404);
    }

    res.send(question);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function answerQuestion(req: UserInfoRequest, res: Response) {
  try {
    const { userId } = req;
    const questionId = Number(req.params.id);
    const { answer } = req.body;

    if (!answer) return res.sendStatus(400);

    await questionRespository.answerQuestion(userId, questionId, answer);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function findClearQuestions(req: Request, res: Response) {
  try {
    const questions = await questionRespository.findClearQuestions();

    res.send(questions);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export {
  createQuestion, findQuestionByID, findClearQuestions, answerQuestion,
};
