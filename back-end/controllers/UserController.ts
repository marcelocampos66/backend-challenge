import express, { Request, Response, NextFunction } from 'express';
import Middlewares from '../middlewares/Middlewares';
import { UserService } from '../services/UserService';

class UserController extends Middlewares {
  public router: express.Router;
  private service: UserService;

  constructor(service: UserService) {
    super();
    this.router = express.Router();
    this.service = service;
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
    await this.service.register({ msisdn, name, password });
    return res.status(201).json({ message: 'Ok!' });
  }

}

export default UserController;
