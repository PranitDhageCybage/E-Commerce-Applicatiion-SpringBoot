const express = require("express");
const utils = require("../../utils");
const db = require("../../db");
const router = express.Router();

// ----------------------------------------------------
// GET
// ----------------------------------------------------

router.get("/", (request, response) => {
  const statement = `SELECT id, userId, address, city, state, country, pin FROM address`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

// ----------------------------------------------------
// POST
// ----------------------------------------------------

router.post("/", (request, response) => {
  const { address, city, state, country, pin } = request.body;
  const statement = `INSERT INTO address (userId, address, city, state, country, pin) VALUES (
      ${request.userId}, '${address}', '${city}', '${state}', '${country}', '${pin}'
      )`;

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

// ----------------------------------------------------
// DELETE
// ----------------------------------------------------

router.delete("/:id", (request, response) => {
  const { id } = request.params;
  const statement = `DELETE FROM address WHERE id = ${id}`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
