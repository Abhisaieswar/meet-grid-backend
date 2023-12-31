import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import { DataSource } from "typeorm";

export const getDataSource = (): DataSource => {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: process.env.DATABASEPORT as any,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    entities: [`${__dirname}/entities/*.js`],
    namingStrategy: new SnakeNamingStrategy(),
  });
  if (!dataSource) {
    throw new Error("Error in creating DB Source!");
  }

  return dataSource;
};
