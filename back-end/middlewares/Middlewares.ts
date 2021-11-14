import { Request, Response, NextFunction } from 'express';
import Helpers from '../helpers/Helpers';
import UserModel from '../models/UserModel';

class Middlewares {
  private helpers: Helpers;
  private model: UserModel;

  constructor() {
    this.helpers = new Helpers();
    this.model = new UserModel();
  }

  public verifyUserInfos = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body: { msisdn, name, password } } = req;
    const { error } = this.helpers.verifyUserInfosJoi({
      msisdn,
      name,
      password,
    });
    if (error) {
      return next({ status: 422, message: error.details[0].message });
    }
    return next();
  };

  public verifyUserExists = async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ) => {
    const { body: { msisdn } } = req;
    const userExists = await this.model.getUserByMsisdn(msisdn);
    if (userExists) {
      return next({ status: 409, message: 'User already exists' });
    }
    return next();
  }

};

export default Middlewares;
