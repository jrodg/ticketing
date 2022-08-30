import { MongoMemoryServer  } from "mongodb-memory-server";
import  mongoose  from "mongoose";
import { app } from "../app";
import request from 'supertest';

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdasd"
  jest.setTimeout(120000)
  mongo = await MongoMemoryServer.create()
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {

  });
});

beforeEach(async () => {
 jest.setTimeout(90000)
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  jest.setTimeout(90000)
  await mongo.stop();
  await mongoose.connection.close();
});
global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email,
      password
    })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};