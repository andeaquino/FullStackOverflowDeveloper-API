import express from "express";
import * as questionController from "../controllers/questionController";
import auth from "../middleware/auth";

const router = express.Router();

router.post("/", questionController.createQuestion);
router.get("/:id", questionController.findQuestionByID);
router.post("/:id", auth, questionController.answerQuestion);
router.get("/", questionController.findClearQuestions);

export default router;