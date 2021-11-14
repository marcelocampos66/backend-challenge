import Helpers from "../helpers/Helpers";

export class UserService {
  private helpers: Helpers;

  constructor(helpers: Helpers) {
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
    // manda pra model
    // console.log(user);
  }

}

export default new UserService(new Helpers());
