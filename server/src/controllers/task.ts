import { Request, Response } from 'express';
import Task from '../models/task';

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
    res.send('edit');
  }

  async delete(req: Request, res: Response) {
    res.send('delete');
  }
}
