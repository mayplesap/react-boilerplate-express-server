"use strict";

const request = require("supertest");

const app = require("../app");

describe("POST /strings", function() {
  const newString = {
    "string": "test string"
  };
  const invalidString = {
    "string": 123
  };

  test("correctly adds", async function() {
    const resp = await request(app)
      .post("/strings")
      .send({
        "string": "test string"
      })

    expect(resp.statusCode).toEqual(201);
    expect(resp.body).toEqual({
      added: newString.string
    });
  });

  test("invalid - empty value", async function() {
    const resp = await request(app)
      .post("/strings")
      .send({})

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([ 'instance requires property "string"' ])
  });

  test("invald - not a string", async function() {
    const resp = await request(app)
      .post("/strings")
      .send(invalidString)

    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([ 'instance.string is not of a type(s) string' ])
  });

});