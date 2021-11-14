import { Request, Response, NextFunction } from 'express';
import Helpers from '../helpers/Helpers';

class Middlewares {
  private helpers: Helpers;

  constructor() {
    this.helpers = new Helpers();
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

};

export default Middlewares;
