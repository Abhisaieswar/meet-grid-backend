import { getDataSource } from "./DataSource";
import { DataSource } from "typeorm";

class DbConnectionManager {
  private static dbInstance: DbConnectionManager;
  private dbConnection: DataSource;

  private constructor() {
    this.dbConnection = getDataSource();
  }

  // Singleton pattern to protect from creating more than 1 db connection
  public static getInstance(): DbConnectionManager {
    if (!DbConnectionManager.dbInstance) {
      DbConnectionManager.dbInstance = new DbConnectionManager();
    }
    return DbConnectionManager.dbInstance;
  }

  private async dbConnect(): Promise<DataSource> {
    if (!this.dbConnection.isInitialized) {
      await this.dbConnection.initialize();
    }
    return this.dbConnection;
  }

  public async getDbConnection(): Promise<DataSource> {
    try {
      return await this.dbConnect();
    } catch (err) {
      return await this.dbConnection.initialize();
    }
  }

  public async getManager() {
    const connection = await this.getDbConnection();
    return connection.manager;
  }
}

export default DbConnectionManager;
