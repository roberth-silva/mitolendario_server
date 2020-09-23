import express from 'express';

import NarrativeController from '../src/controllers/NarrativeController';
import UserController from '../src/controllers/UserController';

const routes = express.Router();

const narrativeController = new NarrativeController();
const userController = new UserController();

routes.get('/narrativas', narrativeController.index);
routes.get('/narrativas/:id', narrativeController.index);
routes.post('/narrativas', narrativeController.create);

export default routes;