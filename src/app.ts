import express from "express";
import cors from "cors";
import * as userController from "./controllers/userController";
import * as questionController from "./controllers/questionController";
import auth from "./middleware/auth";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/users", userController.signUp);

app.post("/questions", questionController.createQuestion);
app.get("/questions/:id", questionController.findQuestionByID);
app.post("/questions/:id", auth, questionController.answerQuestion);
app.get("/questions", questionController.findClearQuestions);

export default app;
