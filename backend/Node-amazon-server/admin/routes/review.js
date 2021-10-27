const express = require("express");
const utils = require("../../utils");
const db = require("../../db");

const router = express.Router();

//==================================================
//                      GET
//==================================================
router.get("/:id", (request, response) => {
  const { id } = request.params;
  const statement = `SELECT * FORM productreviews WHERE productId = ${id}`;
  db.execute(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

//==================================================
//                      OST
//==================================================

module.exports = router;
