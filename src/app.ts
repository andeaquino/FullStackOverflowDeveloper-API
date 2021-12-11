import express from "express";
import cors from "cors";
import * as userController from "./controllers/userController";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/users", userController.signUp);

export default app;
