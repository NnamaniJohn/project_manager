import { Request, Response } from 'express';
import Project from '../models/project';

export class ProjectController {
  async index(req: Request, res: Response) {
    try {
      const projects = await Project.findAll();

      res.json(projects);
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
