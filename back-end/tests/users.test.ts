import 'dotenv/config';
import chai, { expect } from 'chai';
import sinon from 'sinon';
import chaiHttp from 'chai-http';
import { MongoClient } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';
// import ApiMLearn from '../helpers/ApiMLearn';
import App from '../api/App';
import controllers from '../controllers';
import mocks from './constants';

chai.use(chaiHttp)

describe('POST /users', () => {

  describe('Cria um usuario com sucesso', () => {
    let response: ChaiHttp.Response;
    let DBServer: MongoMemoryServer;
    let connectionMock;

    before(async () => {
      DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);
      // sinon.stub(ApiMLearn, 'post').resolves({ data: 'Tudo Ok!' });

      response = await chai.request(
        new App(8080, controllers).getExpressInstance()
      )
        .post('/users')
        .send(mocks.validUser);
    });

    after(async () => {
      await DBServer.stop();
      sinon.restore();
    });

    it('retorna o código de status 201', () => {
      expect(response).to.have.status(201);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "user"', () => {
      expect(response.body).to.have.property('user');
    });

    it('o objeto possui a propriedade "mLearnResponse"', () => {
      expect(response.body).to.have.property('mLearnResponse');
    });

    it('o objeto "user" possui a propriedade "msisdn"', () => {
      expect(response.body.user).to.have.property('msisdn');
    });

    it('o objeto "user" possui a propriedade "name"', () => {
      expect(response.body.user).to.have.property('name');
    });

    it('o objeto "user" possui a propriedade "access_level"', () => {
      expect(response.body.user).to.have.property('access_level');
    });

    it('o objeto "user" possui a propriedade "password"', () => {
      expect(response.body.user).to.have.property('password');
    });

    it('o objeto "user" possui a propriedade "_id"', () => {
      expect(response.body.user).to.have.property('_id');
    });

  });

  describe('Tenta criar um usuario com msisdn invalido', () => {
    let response: ChaiHttp.Response;
    let DBServer: MongoMemoryServer;
    let connectionMock;

    before(async () => {
      DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(
        new App(8080, controllers).getExpressInstance()
      )
        .post('/users')
        .send(mocks.invalidMsisdnUser);
    });

    after(async () => {
      await DBServer.stop();
      sinon.restore();
    });

    it('retorna o código de status 422', () => {
      expect(response).to.have.status(422);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "message" tem o valor ""msisdn" length must be 14 characters long"', () => {
      const messageValue = '"msisdn" length must be 14 characters long';
      expect(response.body.message).to.be.equal(messageValue);
    });

  });

  describe('Tenta criar um usuario com name invalido', () => {
    let response: ChaiHttp.Response;
    let DBServer: MongoMemoryServer;
    let connectionMock;

    before(async () => {
      DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(
        new App(8080, controllers).getExpressInstance()
      )
        .post('/users')
        .send(mocks.invalidNameUser);
    });

    after(async () => {
      await DBServer.stop();
      sinon.restore();
    });

    it('retorna o código de status 422', () => {
      expect(response).to.have.status(422);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "message" tem o valor ""name" must be a string', () => {
      const messageValue = '"name" must be a string';
      expect(response.body.message).to.be.equal(messageValue);
    });

  });

  describe('Tenta criar um usuario com password invalido', () => {
    let response: ChaiHttp.Response;
    let DBServer: MongoMemoryServer;
    let connectionMock;

    before(async () => {
      DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(
        new App(8080, controllers).getExpressInstance()
      )
        .post('/users')
        .send(mocks.invalidPassUser);
    });

    after(async () => {
      await DBServer.stop();
      sinon.restore();
    });

    it('retorna o código de status 422', () => {
      expect(response).to.have.status(422);
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('A propriedade "message" tem o valor ""password" length must be at least 6 characters long', () => {
      const messageValue = '"password" length must be at least 6 characters long';
      expect(response.body.message).to.be.equal(messageValue);
    });

  });

});

describe('GET /users', () => {
  const dbName = process.env.MONGO_DB || 'mlearn_challenge';

  describe('retorna um array de usuarios se tiver usuarios cadastrados', () => {
    let response: ChaiHttp.Response;
    let DBServer: MongoMemoryServer;
    let connectionMock;

    before(async () => {
      DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db(dbName)
        .collection('users')
        .insertMany(mocks.validUsersArr);

      response = await chai.request(
        new App(8080, controllers).getExpressInstance()
      )
        .get('/users')
        .send(mocks.invalidPassUser);
    });

    after(async () => {
      await DBServer.stop();
      sinon.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array no body', () => {
      expect(response.body).to.be.an('array');
    });

    it('retorna um array de objetos no body', () => {
      expect(response.body[0]).to.be.a('object');
    });

    it('o objeto possui a propriedade "msisdn"', () => {
      expect(response.body[0]).to.have.property('msisdn');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body[0]).to.have.property('name');
    });

    it('o objeto "user" possui a propriedade "password"', () => {
      expect(response.body[0]).to.have.property('password');
    });

    it('o objeto "user" possui a propriedade "_id"', () => {
      expect(response.body[0]).to.have.property('_id');
    });

  });

  describe('retorna um array vazio caso nao tenha usuarios cadastrados', () => {
    let response: ChaiHttp.Response;
    let DBServer: MongoMemoryServer;
    let connectionMock;

    before(async () => {
      DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      response = await chai.request(
        new App(8080, controllers).getExpressInstance()
      )
        .get('/users')
        .send(mocks.invalidPassUser);
    });

    after(async () => {
      await DBServer.stop();
      sinon.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array no body', () => {
      expect(response.body).to.be.an('array');
    });

    it('retorna um array vazio no body', () => {
      expect(response.body).to.have.length(0);
    });

  });

});

describe('PUT /:id/:action', () => {

  describe('Faz o upgrade do Access Level do Usuario', () => {
    const dbName = process.env.MONGO_DB || 'mlearn_challenge';
    let response: ChaiHttp.Response;
    let DBServer: MongoMemoryServer;
    let connectionMock;

    before(async () => {
      DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db(dbName)
        .collection('users')
        .insertOne(mocks.userRegistry);

      response = await chai.request(
        new App(8080, controllers).getExpressInstance()
      )
        .put('/users/6192b8891ba9d668ecf36ec7/upgrade')
    });

    after(async () => {
      await DBServer.stop();
      sinon.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array no body', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "msisdn"', () => {
      expect(response.body).to.have.property('msisdn');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body).to.have.property('name');
    });

    it('o objeto possui a propriedade "password"', () => {
      expect(response.body).to.have.property('password');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body).to.have.property('_id');
    });

    it('o objeto possui a propriedade "mLearnResponse"', () => {
      expect(response.body).to.have.property('mLearnResponse');
    });

    it('o objeto possui a propriedade "access_level"', () => {
      expect(response.body).to.have.property('access_level');
    });

    it('a propriedade access_level possui o valor "premium"', () => {
      expect(response.body.access_level).to.be.equal('premium');
    });

  });

  describe('Faz o downgrade do Access Level do Usuario', () => {
    const dbName = process.env.MONGO_DB || 'mlearn_challenge';
    let response: ChaiHttp.Response;
    let DBServer: MongoMemoryServer;
    let connectionMock;

    before(async () => {
      DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db(dbName)
        .collection('users')
        .insertOne(mocks.userRegistry);

      response = await chai.request(
        new App(8080, controllers).getExpressInstance()
      )
        .put('/users/6192b8891ba9d668ecf36ec7/downgrade')
    });

    after(async () => {
      await DBServer.stop();
      sinon.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array no body', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "msisdn"', () => {
      expect(response.body).to.have.property('msisdn');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body).to.have.property('name');
    });

    it('o objeto possui a propriedade "password"', () => {
      expect(response.body).to.have.property('password');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body).to.have.property('_id');
    });

    it('o objeto possui a propriedade "mLearnResponse"', () => {
      expect(response.body).to.have.property('mLearnResponse');
    });

    it('o objeto possui a propriedade "access_level"', () => {
      expect(response.body).to.have.property('access_level');
    });

    it('a propriedade access_level possui o valor "free"', () => {
      expect(response.body.access_level).to.be.equal('free');
    });

  });

  describe('Ao tentar fazer upgrade do Access Level ja sendo premium nada acontece', () => {
    const dbName = process.env.MONGO_DB || 'mlearn_challenge';
    let response: ChaiHttp.Response;
    let DBServer: MongoMemoryServer;
    let connectionMock;

    before(async () => {
      DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db(dbName)
        .collection('users')
        .insertOne(mocks.userRegistryPremium);

      response = await chai.request(
        new App(8080, controllers).getExpressInstance()
      )
        .put('/users/6192b8891ba9d668ecf36ec7/upgrade')
    });

    after(async () => {
      await DBServer.stop();
      sinon.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array no body', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "msisdn"', () => {
      expect(response.body).to.have.property('msisdn');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body).to.have.property('name');
    });

    it('o objeto possui a propriedade "password"', () => {
      expect(response.body).to.have.property('password');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body).to.have.property('_id');
    });

    it('o objeto possui a propriedade "mLearnResponse"', () => {
      expect(response.body).to.have.property('mLearnResponse');
    });

    it('o objeto possui a propriedade "access_level"', () => {
      expect(response.body).to.have.property('access_level');
    });

    it('a propriedade access_level possui o valor "premium"', () => {
      expect(response.body.access_level).to.be.equal('premium');
    });

  });

  describe('Ao tentar fazer downgrade do Access Level ja sendo free nada acontece', () => {
    const dbName = process.env.MONGO_DB || 'mlearn_challenge';
    let response: ChaiHttp.Response;
    let DBServer: MongoMemoryServer;
    let connectionMock;

    before(async () => {
      DBServer = await MongoMemoryServer.create();
      const URLMock = DBServer.getUri();
      connectionMock = await MongoClient.connect(URLMock);

      sinon.stub(MongoClient, 'connect').resolves(connectionMock);

      await connectionMock.db(dbName)
        .collection('users')
        .insertOne(mocks.userRegistryFree);

      response = await chai.request(
        new App(8080, controllers).getExpressInstance()
      )
        .put('/users/6192b8891ba9d668ecf36ec7/downgrade')
    });

    after(async () => {
      await DBServer.stop();
      sinon.restore();
    });

    it('retorna o código de status 200', () => {
      expect(response).to.have.status(200);
    });

    it('retorna um array no body', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "msisdn"', () => {
      expect(response.body).to.have.property('msisdn');
    });

    it('o objeto possui a propriedade "name"', () => {
      expect(response.body).to.have.property('name');
    });

    it('o objeto possui a propriedade "password"', () => {
      expect(response.body).to.have.property('password');
    });

    it('o objeto possui a propriedade "_id"', () => {
      expect(response.body).to.have.property('_id');
    });

    it('o objeto possui a propriedade "mLearnResponse"', () => {
      expect(response.body).to.have.property('mLearnResponse');
    });

    it('o objeto possui a propriedade "access_level"', () => {
      expect(response.body).to.have.property('access_level');
    });

    it('a propriedade access_level possui o valor "free"', () => {
      expect(response.body.access_level).to.be.equal('free');
    });

  });

});
