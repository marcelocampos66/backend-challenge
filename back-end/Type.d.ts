export interface IUser {
  msisdn: string;
  name: string;
  password: string;
}

export interface IUserDocument {
  _id: ObjectId;
  msisdn: string;
  name: string;
  access_level: Access;
  password: string;
}

export interface INewUser {
  msisdn: string;
  name: string;
  access_level: Access;
  password: string;
}

export interface INewUserMLearn {
  msisdn: string;
  name: string;
  access_level: Access;
  password: string;
  external_id: string;
}

export type Action = 'upgrade' | 'downgrade';

export type Access = 'free' | 'pro' | 'premium';

export interface ILevels {
  free: {
    upgrade: string,
    downgrade: string,
  },
  pro: {
    upgrade: string,
    downgrade: string,
  },
  premium: {
    upgrade: string,
    downgrade: string,
  }
}
