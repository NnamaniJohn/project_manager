import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { Request, Response } from 'express';
import Project from './models/project';
import Task from './models/task';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const { MONGODB_URI } = process.env;
mongoose
  .connect(MONGODB_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(helmet());
app.use(cors());
app.use(morgan('common'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('My Personal Project Management App!');
});

app.get('/projects', async (req: Request, res: Response) => {
  try {
    const projects = await Project.findAll();

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching projects', error });
  }
});

app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find().exec();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
});

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export { app, server };
