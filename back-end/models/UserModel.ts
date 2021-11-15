import Connection from "./Connection";
import { ObjectId } from 'mongodb';

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

  public async getUserById(id: string) {
    return this.connection()
      .then((db) => db.collection('users').findOne({ _id: new ObjectId(id) }));
  }

  public async updateAccessLevel(id: string, accessLevel: Access) {
    return this.connection()
      .then((db) => db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $set: { access_level: accessLevel } },
      ));
  }

}

export default UserModel;
