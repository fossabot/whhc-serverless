import 'reflect-metadata';
import {
  Connection,
  ConnectionManager,
  ConnectionOptions,
  createConnection,
  getConnectionManager,
} from 'typeorm';

import { SimilarNews } from '../helpers/news';
import { Warehouse } from '../helpers/warehouse';

const entities = [SimilarNews, Warehouse];

export class Database {
  private connectionManager: ConnectionManager;

  constructor() {
    this.connectionManager = getConnectionManager();
  }

  public async getConnection(): Promise<Connection> {
    const CONNECTION_NAME = 'RDS';

    let connection: Connection;

    if (this.connectionManager.has(CONNECTION_NAME)) {
      connection = await this.connectionManager.get(CONNECTION_NAME);
      if (!connection.isConnected) {
        connection = await connection.connect();
      }
    } else {
      const connectionOptions: ConnectionOptions = {
        database: process.env.DB_DATABASE,
        entities,
        host: process.env.DB_HOST,
        logging: process.env.DB_LOGGING === 'true',
        name: CONNECTION_NAME,
        password: process.env.DB_PASSWORD,
        port: +process.env.DB_PORT,
        synchronize: process.env.DB_SYNCHRONIZE === 'true',
        type: 'mysql',
        username: process.env.DB_USERNAME,
      };

      connection = await createConnection(connectionOptions);
    }

    return connection;
  }
}
