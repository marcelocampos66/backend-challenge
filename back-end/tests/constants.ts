import { ObjectId } from 'mongodb';

const validUser = {
  msisdn: "+5531999999999",
  name: "João Silva",
  password: "123456",
};

const invalidMsisdnUser = {
  msisdn: "msisinvalido",
  name: "João Silva",
  password: "123456",
};

const invalidNameUser = {
  msisdn: "+5531999999999",
  name: 123,
  password: "123456",
};

const invalidPassUser = {
  msisdn: "+5531999999999",
  name: "João Silva",
  password: "123",
};

const validUsersArr = [
  {
    msisdn: "+5531999999999",
    name: "Thor Odinson",
    password: "123456",
  },
  {
    msisdn: "+5531999999998",
    name: "Odin Borson",
    password: "123456",
  },
  {
    msisdn: "+5531999999997",
    name: "Magni Thorson",
    password: "123456",
  }
];

const userRegistry = {
  _id: new ObjectId("6192b8891ba9d668ecf36ec7"),
  msisdn: "+5531999999999",
  name: "Thor Odinson",
  access_level: "pro",
  password: "c8837b23ff8aaa8a2dde915473ce0991"
};

const userRegistryPremium = {
  _id: new ObjectId("6192b8891ba9d668ecf36ec7"),
  msisdn: "+5531999999999",
  name: "Thor Odinson",
  access_level: "premium",
  password: "c8837b23ff8aaa8a2dde915473ce0991"
};

const userRegistryFree = {
  _id: new ObjectId("6192b8891ba9d668ecf36ec7"),
  msisdn: "+5531999999999",
  name: "Thor Odinson",
  access_level: "free",
  password: "c8837b23ff8aaa8a2dde915473ce0991"
};

export default {
  validUser,
  invalidMsisdnUser,
  invalidNameUser,
  invalidPassUser,
  validUsersArr,
  userRegistry,
  userRegistryPremium,
  userRegistryFree,
}
