import { Sequelize } from "sequelize";
import { POSTGRES_DATABASE_NAME, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_USER } from "../environment";

const db = new Sequelize({
  host: POSTGRES_HOST,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE_NAME,
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

export default db;
