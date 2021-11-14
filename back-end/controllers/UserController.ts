import express, { Request, Response, NextFunction, Router } from 'express';
import Middlewares from '../middlewares/Middlewares';

class UserController extends Middlewares {
  public router: express.Router;

  constructor() {
    super();
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/', [
      this.verifyUserInfos,
      this.register,
    ]);
  }

  private register = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const { body: { msisdn, name, password } } = req;
    return res.status(201).json({ message: 'Ok!' });
  }

}

export default UserController;
