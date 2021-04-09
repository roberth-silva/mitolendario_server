import express from 'express';

import AnswerController from '../src/controllers/AnswerController';
import QuestionController from '../src/controllers/QuestionsController';
import NarrativeController from '../src/controllers/NarrativeController';
import GameController from "../src/controllers/GameController";

const routes = express.Router();

const answerController = new AnswerController();
const questionController = new QuestionController();
const narrativeController = new NarrativeController();
const gameController = new GameController();

routes.get("/games", gameController.index);
routes.post("/games", gameController.create);
routes.get('/narrativas', narrativeController.index);
routes.get('/narrativas/:id', narrativeController.index);
routes.post('/narrativas', narrativeController.create);
routes.get('/questoes', questionController.index);
routes.post('/questao', questionController.create);
routes.post('/questoes', questionController.getPerGameId);
routes.get('/answers', answerController.index);
routes.get("/answers/:id", answerController.index);
routes.get("/", (request, response) => {
  response.send("Hello world! " + process.env.DATABASE_URL);
});
//as
export default routes;