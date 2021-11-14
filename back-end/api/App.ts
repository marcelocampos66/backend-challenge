import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorMiddleware from '../middlewares/errorMiddleware';
import { IControllers } from '../controllers';

class App {
  public app: express.Application;
  public port: number;
  private controllers: IControllers;

  constructor(port: number, controllers: IControllers) {
    this.app = express();
    this.port = port;
    this.controllers = controllers;
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
    this.app.use('/users', this.controllers.users.router);
  }

  private handleErrors() {
    this.app.use(errorMiddleware);
  }

  public startServer() {
    this.app.listen(this.port, () => {
      console.log(`API online on port: ${this.port}`);
    });
  }

};

export default App;
