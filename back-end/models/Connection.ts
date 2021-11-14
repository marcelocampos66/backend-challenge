import 'dotenv/config';
import { MongoClient } from 'mongodb';

const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017';
const MONGO_DB = process.env.MONGO_DB || 'mlearn_challenge';

class Connection {
  private URL: string;
  private dbName : string;

  constructor(url: string, dbName: string) {
    this.URL = url;
    this.dbName = dbName;
  }

  public connection() {
    return MongoClient.connect(this.URL)
      .then((connection) => connection.db(this.dbName))
      .catch((error) => {
        console.error(error);
        process.exit();
      });
  }

}

export default new Connection(MONGO_DB_URL, MONGO_DB);
