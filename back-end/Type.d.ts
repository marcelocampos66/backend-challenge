interface IUser {
  msisdn: string;
  name: string;
  password: string;
}

interface IUserDocument {
  _id: ObjectId;
  msisdn: string;
  name: string;
  access_level: Access;
  password: string;
}

interface INewUser {
  msisdn: string;
  name: string;
  access_level: Access;
  password: string;
}

interface INewUserMLearn {
  msisdn: string;
  name: string;
  access_level: Access;
  password: string;
  external_id: string;
}

type Action = 'upgrade' | 'downgrade';

type Access = 'free' | 'pro' | 'premium';

interface ILevels {
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
