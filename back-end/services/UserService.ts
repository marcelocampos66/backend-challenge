import Helpers from "../helpers/Helpers";
import UserModel from "../models/UserModel";

export class UserService {
  private model: UserModel;
  private helpers: Helpers;

  constructor(model: UserModel, helpers: Helpers) {
    this.model = model;
    this.helpers = helpers;
  }

  public async register(newUser: IUser) {
    const { msisdn, name, password } = newUser;
    const user: INewUser = {
      msisdn,
      name,
      access_level: 'free',
      password: this.helpers.hashPassword(password),
    };
    await this.model.register(user);
    return user;
  }

}

export default new UserService(new UserModel(), new Helpers());
