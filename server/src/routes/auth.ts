import express from 'express';
import { AuthController } from '../controllers/auth';
import { body, param } from 'express-validator';

const router = express.Router();

const authController = new AuthController();

router.post(
  '/register',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.register
);

router.post(
  '/login',
  [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authController.login
);

export { router as auth };
