const app = require("../app");
const request = require("supertest");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IkZyZWR2dW5paSIsInBhc3N3b3JkIjoiZnJlZGRkIn0sImlhdCI6MTY1ODM4NDg3OH0.LtfMra1bFjTM5tjNYHWwr3MN2VqkwB4y8ixHxY60FUY';

// test('Should get all users in the database', async()=>{
//     await request(app)
//     .get('/api/v1/users')
//     .set({Authorization : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IkZyZWR2dW5paSIsInBhc3N3b3JkIjoiZnJlZGRkIn0sImlhdCI6MTY1ODM4NDg3OH0.LtfMra1bFjTM5tjNYHWwr3MN2VqkwB4y8ixHxY60FUY'})
//     .expect(200)
// })

const user = {
  username: "username",
  password: "password",
};
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2OCwidXNlcm5hbWUiOiJmcmVkZHJkIiwicGFzc3dvcmQiOiJmcmVkZGQifSwiaWF0IjoxNjU4NDExMDc5fQ.51zWSbYzJ_8-IZcqoxqLX6aXMJ9lu6XQ5RbiCckcIws";

beforeAll(async () => {
  await prisma.user.findFirst({
    where: {
      username: user.username,
      password: user.password,
    },
  });
});

test("should get all the users", async () => {
  await request(app).get("/api/v1/users").expect(200);
});

test("Should not login non-existent user", async () => {
  await request(app)
    .post("/api/v1/users")
    .send({
      username: user.username,
      password: user.password,
    })
    .expect(500);
});

test("Should delete account for user", async () => {
  await request(app)
    .delete("/api/v1/users/22")
    .set({ Authorization: `Bearer ${token}` })
    .expect(200);
});

test("Should not delete account by unauthenticated user", async () => {
  await request(app).delete("/api/v1/users/20").expect(500);
});

test("Should not create a new user without username", async () => {
  await request(app)
    .post("/api/v1/users")
    .send({
      password: user.password,
    })
    .expect(500);
});
