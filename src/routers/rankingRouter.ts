import express from 'express';
import * as rankingController from '../controllers/rankingController';

const router = express.Router();

router.get('/ranking', rankingController.findTopUsers);

export default router;
