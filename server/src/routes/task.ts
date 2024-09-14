import express from 'express';
import { body, param } from 'express-validator';
import { TaskController } from '../controllers/task';

const task: express.Router = express.Router();
const taskController = new TaskController();

task.get('/', taskController.index);

task.get('/:id/show', taskController.show);

task.post('/create', taskController.create);

task.put(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid task ID'),
    body('title').notEmpty().withMessage('Title is required'),
    body('status')
      .notEmpty()
      .withMessage('Status is required')
      .isIn(['pending', 'in-progress', 'completed'])
      .withMessage('Invalid status'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string'),
    body('dueDate')
      .optional()
      .isISO8601()
      .toDate()
      .withMessage('Invalid due date'),
  ],
  taskController.edit
);

task.delete('/:id', taskController.delete);

export default task;
