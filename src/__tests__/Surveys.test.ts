import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe("Surveys", () => {
  beforeAll( async() => {
    const connection =await createConnection();
    await connection.runMigrations();
  });

  it("Should be able to create a new surveys", async() => {
    const response = await request(app).post("/surveys").send({
      title: "Title exaple",
      description: "Descrition Example"
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should be able to get all to surveys", async () => {
    const response = await request(app).get("/surveys");
    expect(response.body.length).toBe(1);
  })
});
