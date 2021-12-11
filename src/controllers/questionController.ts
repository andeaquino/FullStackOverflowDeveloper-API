import { Request, Response } from "express";
import * as questionRespository from "../repositories/questionRepository";

async function createQuestion(req: Request, res: Response) {

  try {
    const { question, student, class: group, tags } = req.body;

    if (!question || !student || !group || !tags) return res.sendStatus(400);

    const id = await questionRespository.createQuestion({question, student, group, tags});

    if (id === null) {
      return res.sendStatus(422);
    }

    res.status(201).send(id);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export { createQuestion };