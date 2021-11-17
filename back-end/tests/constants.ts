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

export default {
  validUser,
  invalidMsisdnUser,
  invalidNameUser,
  invalidPassUser,
  validUsersArr,
}
