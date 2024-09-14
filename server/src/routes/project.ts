import express from 'express';
import { ProjectController } from '../controllers/project';

const project: express.Router = express.Router();
const projectController = new ProjectController();

project.get('/', projectController.index);

project.get('/:id/show', projectController.show);

project.post('/create', projectController.create);

project.put('/:id/update', projectController.edit);

project.delete('/:id/delete', projectController.delete);

export default project;
