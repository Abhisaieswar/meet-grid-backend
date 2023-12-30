import "reflect-metadata";

import { getDataSource } from "./datasource";

export class DbConnectionManager {
  static dbInstance;
  constructor() {
    DbConnectionManager._dbConnection = getDataSource();
  }

  //singleton pattern to protect from creating more than 1 db connection
  static getConnectionManger() {
    if (!DbConnectionManager.dbInstance) {
      DbConnectionManager.dbInstance = getDataSource();
    }
    return DbConnectionManager.dbInstance;
  }

  async dbConnect() {
    if (!this._dbConnection.isInitialized) {
      await this._dbConnection.initialize();
    }
    return this._dbConnection;
  }

  async getDbConnection() {
    return await this.dbConnect()
      .then((connection) => connection)
      .catch(async (err) => {
        console.log(err);
        return await this._dbConnection.initialize();
      });
  }

  async getManager() {
    return await this.getDbConnection().then(
      (connection) => connection.manager
    );
  }
}
