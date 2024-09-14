import express from 'express';
import { body, param } from 'express-validator';
import { ProjectController } from '../controllers/project';

const project: express.Router = express.Router();
const projectController = new ProjectController();

project.get('/', projectController.index);

project.get('/:id/show', projectController.show);

project.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description')
      .optional()
      .isString()
      .withMessage('Description must be a string'),
  ],
  projectController.create
);

project.put('/:id/update', projectController.edit);

project.delete('/:id/delete', projectController.delete);

project.get('/:id/tasks', projectController.getProjectTasks);

project.post(
  '/:id/tasks',
  [
    param('id').isInt().withMessage('Invalid project ID'),
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
  projectController.createProjectTask
);

export default project;
