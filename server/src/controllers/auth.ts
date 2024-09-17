import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';
import { validationResult } from 'express-validator';

const JWT_SECRET = 'secret';

export class AuthController {
  async register(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { username, password } = req.body;

    console.log('username', username);
    console.log('password', password);
    try {
      const user = await User.create({ username, password });
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error });
    }
  }

  async login(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Create JWT
      const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  }
}
