const getDataSource = require("./DataSource");

class DbConnectionManager {
  static dbInstance;
  constructor() {
    this._dbConnection = getDataSource();
  }

  //singleton pattern to protect from creating more than 1 db connection
  static getInstance() {
    if (!DbConnectionManager.dbInstance) {
      DbConnectionManager.dbInstance = new DbConnectionManager();
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
        return await this._dbConnection.initialize();
      });
  }

  async getManager() {
    return await this.getDbConnection().then(
      (connection) => connection.manager
    );
  }
}

module.exports = DbConnectionManager;
