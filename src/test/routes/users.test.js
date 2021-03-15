const request = require("supertest");
const buildApp = require("../../app");
const UserRepo = require("../../repos/user-repo");
const pool = require("../../pool");

beforeAll(() => {
  return pool.connect({
    host: "localhost",
    port: 5432,
    database: "training-test",
    user: "postgres",
    password: "postgres",
  });
});

afterAll(() => {
  return pool.close();
});

it("create a user", async () => {
  const startingCount = await UserRepo.count();

  await request(buildApp())
    .post("/api/users")
    .send({ username: "user", bio: "bio" })
    .expect(200);

  const finishCount = await UserRepo.count();
  expect(finishCount - startingCount).toEqual(1);
});
