import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import project from './routes/project';
import dotenv from 'dotenv';
import task from './routes/task';

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

app.use('/projects', project);
app.use('/tasks', task);

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export { app, server };
