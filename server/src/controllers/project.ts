import { Request, Response } from 'express';
import Project from '../models/project';
import Task from '../models/task';
import { validationResult } from 'express-validator';

export class ProjectController {
  async index(req: Request, res: Response) {
    try {
      const projects = await Project.findAll();

      const projectsWithTasks = await Promise.all(
        projects.map(async (project) => {
          const tasks = await Task.find({ projectId: project.id });
          return { ...project.toJSON(), tasks, tasksCount: tasks.length };
        })
      );

      res.json(projectsWithTasks);
    } catch (err) {
      res.send(`an error occur${err}`);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const project = await Project.findOne({ where: { id } });
      if (!project) {
        return res
          .status(404)
          .json({ success: false, error: 'Project not found' });
      }

      res.json(project);
    } catch (err) {
      res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }

  async create(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description } = req.body;

    try {
      const newProject = await Project.create({ title, description });
      res.status(201).json({ success: true, data: newProject });
    } catch (err) {
      res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }

  async edit(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id } = req.params;
    const { title, description } = req.body;

    try {
      const project = await Project.findOne({ where: { id } });
      if (!project) {
        return res
          .status(404)
          .json({ success: false, error: 'Project not found' });
      }

      project.title = title;
      project.description = description;
      await project.save();

      res.json({ success: true, data: project });
    } catch (err) {
      res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const project = await Project.findOne({ where: { id } });
      if (!project) {
        return res
          .status(404)
          .json({ success: false, error: 'Project not found' });
      }

      await project.destroy();
      await Task.deleteMany({ projectId: id });

      res.status(201).json({ success: true, data: project });
    } catch (err) {
      res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }

  async getProjectTasks(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tasks = await Task.find({ projectId: id });

      res.json(tasks);
    } catch (err) {
      res.send(`an error occur${err}`);
    }
  }

  async createProjectTask(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { id } = req.params;
      const task = await Task.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        dueDate: req.body.dueDate,
        projectId: id,
      });
      res.status(201).json({ success: true, data: task });
    } catch (err) {
      res.status(500).json({ error: `Internal Server Error: ${err}` });
    }
  }
}
