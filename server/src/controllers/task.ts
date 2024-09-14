import { Request, Response } from 'express';
import Task from '../models/task';
import { validationResult } from 'express-validator';

export class TaskController {
  async index(req: Request, res: Response) {
    try {
      const tasks = await Task.find().exec();

      res.json(tasks);
    } catch (err) {
      res.send(`an error occur${err}`);
    }
  }

  async show(req: Request, res: Response) {
    res.send('show');
  }

  async create(req: Request, res: Response) {
    res.send('create');
  }

  async edit(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const id = req.params.id;
      const task = await Task.findByIdAndUpdate(id, {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate,
      });
      res.status(201).json({ success: true, data: task });
    } catch (err) {
      res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const task = await Task.findByIdAndDelete(id);
      res.status(201).json({ success: true, data: task });
    } catch (err) {
      res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }
}
