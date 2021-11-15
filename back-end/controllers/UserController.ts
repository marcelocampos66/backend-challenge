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
      this.verifyUserExists,
      this.register,
    ]);
    this.router.get('/', this.getAllUsers);
  }

  private register = async (
    req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const { body: { msisdn, name, password } } = req;
    const result = await this.service.register({ msisdn, name, password });
    return res.status(201).json(result);
  }

  private getAllUsers = async (
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    const users = await this.service.getAllUsers();
    return res.status(200).json(users);
  }

  private upgrade = async (
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {

  }

  private downgrade = async (
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    
  }

}

export default UserController;
