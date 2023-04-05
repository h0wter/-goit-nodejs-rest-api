import "dotenv/config";
import mongoose from "mongoose";
import request from "supertest";
import { User } from "../../models/users.js";

import { app } from "../../app.js";
const { DB_HOST_TEST, PORT } = process.env;
describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterAll(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST_TEST).then(() => done());
  });

  afterEach((done) => {
    User.collection
      .drop()
      .then(() => mongoose.connection.close())
      .then(() => done());
  });

  test("test login route", async () => {
    const newUser = {
      email: "test@gmail.com",
      password: "Password1",
    };

    await request(app).post("/api/users/register").send(newUser);

    const response = await request(app).post("/api/users/login").send(newUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toBeTruthy();
    const user = await User.findOne({ token: body.token });
    expect(user).toBeTruthy();
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.subscription).toBe("string");
  });
});
