import { Request, Response } from 'express';
import * as userService from '../services/userService';

async function signUp(req: Request, res: Response) {
  try {
    const { name, class: group } = req.body;

    if (!name || !group) return res.sendStatus(400);

    const token = await userService.createUser({ name, group });

    if (token === null) {
      return res.sendStatus(422);
    }

    res.status(201).send({ token });
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export { signUp };
