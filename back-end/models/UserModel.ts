import Connection from "./Connection";

class UserModel extends Connection {

  constructor() {
    super();
  }

  public async register(newUser: INewUser) {
    return this.connection()
      .then((db) => db.collection('users').insertOne(newUser))
      .then(({ insertedId }) => insertedId)
  }

  public async getUserByMsisdn(msisdn: string) {
    return this.connection()
      .then((db) => db.collection('users').findOne({ msisdn }));
  }

  public async getAllUsers() {
    return this.connection()
      .then((db) => db.collection('users').find().toArray());
  }

}

export default UserModel;
