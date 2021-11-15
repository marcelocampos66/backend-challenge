import Helpers from "../helpers/Helpers";
import UserModel from "../models/UserModel";
import ApiMLearn from '../helpers/ApiMLearn';

const TOKEN = process.env.MLEARN_TOKEN || '';
const SERVICE_ID = process.env.MLEARN_SERVICE_ID || '';
const GROUP_ID = process.env.MLEARN_GROUP_ID || '';

export class UserService {
  private model: UserModel;
  private helpers: Helpers;
  private ApiMLearn: ApiMLearn;

  constructor(model: UserModel, helpers: Helpers, ApiMLearn: ApiMLearn) {
    this.model = model;
    this.helpers = helpers;
    this.ApiMLearn = ApiMLearn;
  }

  private async registerOnMLearn(newUser: INewUserMLearn) {
    return this.ApiMLearn.post(newUser);
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

  public async updateAccessLevelOnMLearn(id: string, action: Action) {
    return this.ApiMLearn.put(id, action);
  }

  public async updateAccessLevel(id: string, action: Action) {
    const user = await this.model.getUserById(id);
    const actualAcess: Access = user?.access_level;
    const newAccessLevel = this.helpers.getNewAcessLevel(actualAcess, action) as Access;
    await this.model.updateAccessLevel(id, newAccessLevel);
    const mLearnResponse = await this.updateAccessLevelOnMLearn(id, action);
    const updatedUser = await this.model.getUserById(id);
    return { ...updatedUser, mLearnResponse, };
  }

}

export default new UserService(
  new UserModel(),
  new Helpers(),
  new ApiMLearn(TOKEN, SERVICE_ID, GROUP_ID),
);
