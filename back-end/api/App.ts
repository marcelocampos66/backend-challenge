import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.initializeMiddlewares();
    this.callRoutes();
    this.handleErrors();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private callRoutes() {
  
  }

  private handleErrors() {

  }

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`API online on port: ${this.port}`);
    });
  }

}

export default App;
