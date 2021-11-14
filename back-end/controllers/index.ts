import UserController from './UserController';

export interface IControllers {
  users: UserController;
}

const controllers: IControllers = {
  users: new UserController(),
}

export default controllers;
