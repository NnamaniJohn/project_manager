import express from 'express';
import { TaskController } from '../controllers/task';

const task: express.Router = express.Router();
const taskController = new TaskController();

task.get('/', taskController.index);

task.get('/:id/show', taskController.show);

task.post('/create', taskController.create);

task.put('/:id/update', taskController.edit);

task.delete('/:id/delete', taskController.delete);

export default task;
