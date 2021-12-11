import express from "express";
import cors from "cors";
import * as userController from "./controllers/userController";
import * as questionController from "./controllers/questionController";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/users", userController.signUp);

app.post("/questions", questionController.createQuestion);

export default app;
