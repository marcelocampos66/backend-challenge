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
      this.verifyUserAlreadyExists,
      this.register,
    ]);
    this.router.get('/', this.getAllUsers);
    this.router.put('/:id/:action', [
      this.verifyUserExists,
      this.updateAccessLevel,
    ]);
  }

  private register = async (
    req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const { body: { msisdn, name, password } } = req;
    const result = await this.service.register({ msisdn, name, password });
    return res.status(201).json(result);
  }

  private getAllUsers = async (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    const users = await this.service.getAllUsers();
    return res.status(200).json(users);
  }

  private updateAccessLevel = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { params: { id, action } } = req;
    if (action !== 'upgrade' && action !== 'downgrade') {
      return next({ status: 400, message: 'Incorrect action' });
    }
    const result = await this.service.updateAccessLevel(id, action);
    return res.status(200).json(result);
  }

}

export default UserController;
