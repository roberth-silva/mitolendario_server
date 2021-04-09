"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AnswerController_1 = __importDefault(require("../src/controllers/AnswerController"));
var QuestionsController_1 = __importDefault(require("../src/controllers/QuestionsController"));
var NarrativeController_1 = __importDefault(require("../src/controllers/NarrativeController"));
var GameController_1 = __importDefault(require("../src/controllers/GameController"));
var routes = express_1.default.Router();
var answerController = new AnswerController_1.default();
var questionController = new QuestionsController_1.default();
var narrativeController = new NarrativeController_1.default();
var gameController = new GameController_1.default();
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
routes.get("/", function (request, response) {
    response.send("Hello world! " + process.env.DATABASE_URL);
});
//as
exports.default = routes;
