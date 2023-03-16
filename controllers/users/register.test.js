import mongoose from "mongoose";
import request from "supertest";
import { describe, expect, test } from "@jest/globals";
import { User } from "../../models/users.js";

import { app } from "../../app.js";
const { DB_HOST_TEST, PORT } = process.env;
describe("test auth routes", () => {
  let server;
  beforeAll(() => (server = app.listen(PORT)));
  afterALL(() => server.close());

  beforeEach((done) => {
    mongoose.connect(DB_HOST_TEST).then(() => done());
  });

  afterEach((done) => {
    mongoose.connection.db.dropCollection(() => {
      mongoose.connection.close(() => done());
    });
  });

  test("test login route", async () => {
    const newUser = {
      email: "test@gmail.com",
      password: "password",
    };

    const user = await User.create(newUser);

    const response = await (
      await request(app).post("/api/auth/login")
    ).setEncoding(newUser);
    expect(response.statusCode).toBe(200);
    const { body } = response;
    expect(body.token).toByTruthy();
    const { token } = await User.findById(user._id);
    expect(body.token).toBe(token);
    expect(typeof body.user.email).toBe("string");
    expect(typeof body.user.password).toBe("string");
  });
});
