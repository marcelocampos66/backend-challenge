import Helpers from "../helpers/Helpers";
import UserModel from "../models/UserModel";
import ApiMLearn from '../helpers/ApiMLearn';

export class UserService {
  private model: UserModel;
  private helpers: Helpers;

  constructor(model: UserModel, helpers: Helpers) {
    this.model = model;
    this.helpers = helpers;
  }

  private async registerOnMLearn(newUser: INewUserMLearn) {
    const token = process.env.MLEARN_TOKEN || 'token';
    const serviceId = process.env.MLEARN_SERVICE_ID || 'service Id';
    const groupId = process.env.MLEARN_GROUP_ID || 'group Id';
    const Api = new ApiMLearn(token, serviceId, groupId);
    return await Api.post(newUser);
  }

  public async register(newUser: IUser) {
    const { msisdn, name, password } = newUser;
    const user: INewUser = {
      msisdn,
      name,
      access_level: 'free',
      password: this.helpers.hashPassword(password),
    };
    const insertedId = await this.model.register(user);
    const mLearnResponse = await this.registerOnMLearn({
      msisdn: user.msisdn,
      name: user.name,
      access_level: user.access_level,
      password: user.password,
      external_id: insertedId.toString(),
    });
    return { user, mLearnResponse };
  }

  public async getAllUsers() {
    const users = await this.model.getAllUsers();
    return users;
  }

}

export default new UserService(new UserModel(), new Helpers());
