import { Request, Response } from 'express';
import * as rankingRepository from '../repositories/rankingRepository';

async function findTopUsers(req: Request, res: Response) {
  try {
    const users = await rankingRepository.findTopUsers();

    res.send(users);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

export { findTopUsers };
