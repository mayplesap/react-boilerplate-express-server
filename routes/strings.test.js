"use strict";

const request = require("supertest");

const app = require("../app");

/********** POST /strings **********/

describe("POST /strings", function() {
  const newString = {
    "string": "test string"
  };

  test("correctly adds", async function() {
    const resp = await request(app)
      .post("/strings")
      .send(newString);

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      added: newString.string
    });
  });

  test("invalid - empty value", async function() {
    const resp = await request(app)
      .post("/strings")
      .send({});

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([ 'instance requires property "string"' ]);
  });

  test("invald - not a string", async function() {
    const resp = await request(app)
      .post("/strings")
      .send({
        "string": 123
      });

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([ 'instance.string is not of a type(s) string' ]);
  });
});

/********** GET /strings **********/

describe("GET /strings", function() {
  test("gets list of strings", async function() {
    const resp = await request(app).get("/strings");
    
    expect(resp.body).toEqual({
      strings: expect.any(Array)
    });
  });
});