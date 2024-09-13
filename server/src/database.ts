import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const {
  MYSQL_HOST,
  MYSQL_DATABASE,
  MYSQL_DATABASE_TEST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  ENV,
} = process.env;

const database = ENV === 'test' ? MYSQL_DATABASE_TEST : MYSQL_DATABASE;

const sequelize = new Sequelize(
  database as string,
  MYSQL_USER as string,
  MYSQL_PASSWORD,
  {
    host: MYSQL_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => console.log('MySQL connected'))
  .catch((err) => console.error('MySQL connection error:', err));

export default sequelize;
