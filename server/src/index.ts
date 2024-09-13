import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('common'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('My Personal Project Management App!');
});

const server = app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export { app, server };
