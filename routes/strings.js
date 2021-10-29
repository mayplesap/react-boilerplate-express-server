"use strict";

/** Routes for strings */

const jsonschema = require("jsonschema");
const express = require("express");
const router = new express.Router();

const { BadRequestError } = require("../expressError");
const stringList = require("../stringList");

const stringSchema = require("../schemas/stringSchema.json");


/** POST /strings
 * 
 * add string { string }
 * 
 * returns { added: string } 
 * 
 */
router.post("/", function(req, res, next) {
  const validator = jsonschema.validate(req.body, stringSchema);
  if (!validator.valid) {
    const errs = validator.errors.map(e => e.stack);
    throw new BadRequestError(errs);
  }

  const { string } = req.body;
  stringList.push(string);
  return res.status(201).json({ added: string });
});

/** GET /strings
 * 
 * get all strings form list
 * 
 * returns { strings }
 *  where strings is array of strings
 */
router.get("/", function(req, res, next) {
  const strings = stringList;
  return res.json({ strings });
});

module.exports = router;