interface IUser {
  msisdn: string;
  name: string;
  password: string;
}

interface INewUser {
  msisdn: string;
  name: string;
  access_level: string;
  password: string;
}

interface INewUserMLearn {
  msisdn: string;
  name: string;
  access_level: string;
  password: string;
  external_id: string;
}