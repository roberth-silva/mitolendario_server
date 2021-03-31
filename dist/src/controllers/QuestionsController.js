"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var connection_1 = __importDefault(require("../database/connection"));
var QuestionsController = /** @class */ (function () {
    function QuestionsController() {
    }
    /**LIST QUESTIONS */
    QuestionsController.prototype.index = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var param, id, questions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        param = request.params;
                        id = param.id;
                        if (!(Number(id) > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, connection_1.default('questions')
                                .where('questions.id', id)
                                .select([
                                "questions.id",
                                "questions.description",
                                "questions.status",
                                "questions.game_id"
                            ])];
                    case 1:
                        questions = _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, connection_1.default('questions')
                            .select([
                            "questions.id",
                            "questions.description",
                            "questions.status",
                            "questions.game_id",
                            "questions.created_at",
                            "questions.updated_at"
                        ])];
                    case 3:
                        questions = _a.sent();
                        _a.label = 4;
                    case 4: 
                    /*const serializedQuestions = questions.map(question => {
                        return {
                            id: question.id,
                            description: question.description,
                            status: question.status,
                            game_id: question.game_id,
                            created_at: question.created_at,
                            updated_at: question.updated_at
                        }
                    });*/
                    return [2 /*return*/, response.json(questions)];
                }
            });
        });
    };
    QuestionsController.prototype.getPerGameId = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var game_id, questions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        game_id = request.body.game_id;
                        return [4 /*yield*/, connection_1.default('questions')
                                .where('questions.game_id', game_id)
                                .select([
                                "questions.id",
                                "questions.description",
                                "questions.status",
                                "questions.game_id"
                            ])];
                    case 1:
                        questions = _a.sent();
                        /*const serializedQuestions = questions.map(question => {
                            return {
                                id: question.id,
                                description: question.decscription,
                                status: question.status,
                                game_id: question.game_id,
                                created_at: question.created_at,
                                updated_at: question.updated_at
                            }
                        });*/
                        return [2 /*return*/, response.json(questions)];
                }
            });
        });
    };
    /**CREATE A NEW QUESTION */
    QuestionsController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, description, status, game_id, created_at, updated_at, answers, trx, insertedQuestion, question_id_1, classAnswer, insertedAnswer, answer_id, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, description = _a.description, status = _a.status, game_id = _a.game_id, created_at = _a.created_at, updated_at = _a.updated_at, answers = _a.answers;
                        console.log('ola');
                        console.log(description, status, game_id, created_at, updated_at, answers);
                        return [4 /*yield*/, connection_1.default.transaction()];
                    case 1:
                        trx = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 6, , 8]);
                        return [4 /*yield*/, trx('questions').insert({
                                description: description,
                                status: status,
                                game_id: game_id,
                                created_at: created_at,
                                updated_at: updated_at
                            })];
                    case 3:
                        insertedQuestion = _b.sent();
                        question_id_1 = insertedQuestion[0];
                        console.log(question_id_1);
                        classAnswer = answers.map(function (answerItem) {
                            return {
                                description: answerItem.description,
                                status: answerItem.status,
                                question_id: question_id_1,
                                created_at: answerItem.created_at,
                                updated_at: answerItem.updated_at
                            };
                        });
                        return [4 /*yield*/, trx("answers").insert(classAnswer)];
                    case 4:
                        insertedAnswer = _b.sent();
                        answer_id = insertedAnswer[0];
                        console.log('answer_id', answer_id);
                        // Como estamos usando o transaction, todas as querys estão apenas esperando o commit para realmente rodarem.
                        // Com todas as inserções preparadas, podemos fazer o commit() que faz as inserções nas tabelas.
                        return [4 /*yield*/, trx.commit()];
                    case 5:
                        // Como estamos usando o transaction, todas as querys estão apenas esperando o commit para realmente rodarem.
                        // Com todas as inserções preparadas, podemos fazer o commit() que faz as inserções nas tabelas.
                        _b.sent();
                        /**API aqui então, retorna mensagem de sucesso para o usuário */
                        return [2 /*return*/, response.status(201).send({
                                id: question_id_1,
                                description: description,
                                status: status,
                                game_id: game_id,
                                created_at: created_at,
                                updated_at: updated_at,
                                answers: answers
                            })];
                    case 6:
                        error_1 = _b.sent();
                        console.log('nao inseriu');
                        // desfaz qualquer alteração no banco
                        return [4 /*yield*/, trx.rollback()];
                    case 7:
                        // desfaz qualquer alteração no banco
                        _b.sent();
                        return [2 /*return*/, response.status(400).json({
                                error: "Unexpected error while creating new question"
                            })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return QuestionsController;
}());
exports.default = QuestionsController;
