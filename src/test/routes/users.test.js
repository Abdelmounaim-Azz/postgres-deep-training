const request = require("supertest");
const buildApp = require("../../app");
const UserRepo = require("../../repos/user-repo");
const pool = require("../../pool");
const keys = require("../../../keys");

beforeAll(() => {
  return pool.connect({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
  });
});

it("create a user", async () => {
  const startingCount = await UserRepo.count();
  expect(startingCount).toEqual(0);

  await request(buildApp())
    .post("/users")
    .send({ username: "test", bio: "test" })
    .expect(200);

  const finishCount = await UserRepo.count();
  expect(finishCount).toEqual(1);
});
