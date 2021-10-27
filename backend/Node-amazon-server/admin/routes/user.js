const express = require("express");
const db = require("../../db");
const utils = require("../../utils");
const { config } = require("../../config");
const crypto = require("crypto-js");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const router = express.Router();

//------------------------------------------------------------
//                          GET
//------------------------------------------------------------
//Get all Users
/**
 * @swagger
 *
 * /user:
 *     get:
 *         description: For getting All Users profile
 *         produces:
 *             - application/json
 *         parameters:
 *          - name: token
 *            description: For Adding Token into Headers
 *            in: hrader
 *            type: string
 *            required: true
 *         responses:
 *             200:
 *                 description: successful message
 */
router.get("/", (request, response) => {
  const statement = `SELECT id, firstName, lastName, address, city, country, zip, phone, email, active FROM user`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

//------------------------------------------------------------
//                          POST
//------------------------------------------------------------

//------------------------------------------------------------
//                          PUT
//------------------------------------------------------------
//Change Active Status
/**
 * @swagger
 *
 * /user/toggle-active/{id}:
 *     put:
 *         description: For changing active status
 *         produces:
 *             - application/json
 *         parameters:
 *          - name: token
 *            description: For Adding Token into Headers
 *            in: hrader
 *            type: string
 *            required: true
 *         responses:
 *             200:
 *                 description: successful message
 */
router.put("/toggle-active/:id", (request, response) => {
  const { id } = request.params;
  const { status } = request.body;
  const statement = `UPDATE user SET active = '${status}' WHERE id = '${id}'`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});
//------------------------------------------------------------
//                          DELETE
//------------------------------------------------------------

//=================== Pending Tasks =================================
/**
 * User Activation + Activation Token
 * Forgot Password
 *
 *
 */

module.exports = router;
