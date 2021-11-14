import UserController from './UserController';
import UserService from '../services/UserService';

export interface IControllers {
  users: UserController;
}

const controllers: IControllers = {
  users: new UserController(UserService),
}

export default controllers;
