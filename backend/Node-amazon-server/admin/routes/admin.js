// const {express, Router} = require('express')
const express = require("express");
const { secret } = require("../../config");
const db = require("../../db");
const utils = require("../../utils");
const crypto = require("crypto-js");
// const mailer = require("../../mailer");
// const uuid = require("uuid");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const { Router } = require("express");

const router = express.Router();
// const router = Router();

//----------------------------------
//              GET
//----------------------------------

//Get Profile
/**
 * @swagger
 *
 * /admin/profile:
 *   get:
 *     description: For getting administrator profile
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: header
 *        name: token
 *        description: For Adding Token into Headers
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: successful message
 */
router.get("/profile", (request, response) => {
  const statement = `select firstName, lastName, email, phone from admin where id = '${request.userId}'`;
  console.log(statement);
  db.query(statement, (error, admins) => {
    if (error) {
      response.send({ status: "error", error: error });
    } else {
      if (admins.length == 0) {
        response.send({ status: "error", error: "Admin does not exists" });
      } else {
        const admin = admins[0];
        response.send(utils.createResult(error, admin));
      }
    }
  });
});

//----------------------------------
//              POST
//----------------------------------

// Sign in
/**
 * @swagger
 *
 * /admin/signin:
 *  post:
 *    description: For Signing in an Administrator
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: user
 *        description: For Signing in an Administrator
 *        type: object
 *        required: true
 *        properties:
 *          email:
 *            type: string
 *          password:
 *            type: string
 *    responses:
 *      200:
 *        description: Successful Message
 *
 */
router.post("/signin", (request, response) => {
  const { email, password } = request.body;
  const statement = `select id, firstName, lastName from admin where email = '${email}' and password =  '${crypto.SHA256(password)}'`;
  db.query(statement, (error, admins) => {
    if (error) {
      response.send({ status: "error", error: error });
    } else {
      if (admins.length == 0) {
        response.send({ status: "error", error: "admin does not exist" });
      } else {
        const admin = admins[0];
        const token = jwt.sign({ id: admin["id"] }, secret);
        response.send(
          utils.createResult(error, {
            firstName: admin["firstName"],
            lastName: admin["lastName"],
            token: token,
          })
        );
      }
    }
  });
});

/**
 * @swagger
 *
 * /admin/dummy-signin:
 *   post:
 *     description: For signing in an administrator
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: email of admin user used for authentication
 *         in: formData
 *         required: true
 *         type: string
 *       - name: password
 *         description: admin's password.
 *         in: formData
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful message
 */
router.post("/dummy-signin", (request, response) => {
  response.send("This is Dummy Sign in");
});

// Sign up

/**
 * @swagger
 *
 * /admin/signup:
 *   post:
 *     description: For signing up an administrator
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: user
 *        description: For signing up an administrator
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - email
 *          - password
 *        properties:
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          email:
 *            type: string
 *          password:
 *            type: string
 *     responses:
 *       200:
 *         description: successful message
 */
router.post("/signup", (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const statement = `INSERT INTO admin (firstName, lastName, email, password) VALUES
  ('${firstName}', '${lastName}', '${email}', '${crypto.SHA256(password)}')`;
  console.log(statement);
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

/**
 * @swagger
 *
 * /admin/dummy-signup:
 *   post:
 *     description: For signing up an administrator
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: firstName
 *         description: first name of admin user
 *         in: in
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: last name of admin user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: email of admin user used for authentication
 *         in: path
 *         required: true
 *         type: string
 *       - name: password
 *         description: admin's password.
 *         in: query
 *         required: true
 *         type: string
 *       - name: confirmPassword
 *         description: admin's confirm password.
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: successful message
 */

router.post("/dummy-signup", (request, response) => {
  response.send("This is Dummy Sign up");
});
//----------------------------------
//              PUT
//----------------------------------

// Edit Profile
/**
 * @swagger
 *
 * /admin/edit-profile:
 *   put:
 *     description: For Editing Profile of an administrator
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: user
 *        description: For Editing Profile of an administrator
 *        type: object
 *        required:
 *          - firstName
 *          - lastName
 *          - phone
 *          - password
 *        properties:
 *          firstName:
 *            type: string
 *          lastName:
 *            type: string
 *          phone:
 *            type: string
 *          password:
 *            type: string
 *      - in: header
 *        name: token
 *        description: For Adding Token into Headers
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: successful message
 */
router.put("/edit-profile", (request, response) => {
  const { firstName, lastName, phone, password } = request.body;
  const statement = `UPDATE admin SET firstName = '${firstName}', lastName = '${lastName}', phone = '${phone}', password = '${password}' WHERE id = ${request.userId}`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});
//----------------------------------
//              DELETE
//----------------------------------

// Delete Admin
/**
 * @swagger
 *
 * /admin/delete:
 *   delete:
 *     description: For Deleting administrator
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: header
 *        name: token
 *        description: For Adding Token into Headers
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: successful message
 */
router.delete("/delete", (request, response) => {
  const statement = `DELETE FROM admin WHERE id = ${request.userId}`;
  console.log(statement);
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});
//---------------------------------------------------------------------------------
//              Swagger Send Data in Body And Header : body
//---------------------------------------------------------------------------------
/*
*    parameters:
*      - in: body
*        name: user
*        description: The user to create.
*        type: object
*        required:
*          - userName
*        properties:
*          email:
*            type: string
*          password:
*            type: string
*      - in: header
*        name: token
*        description: For Adding Token into Headers
*        type: string
*        required: true
//--------------------------------------------------------------------------------------------------------
//              Swagger Send Data in URL : in, path, formData, query
//--------------------------------------------------------------------------------------------------------
 *     parameters:
 *       - name: firstName
 *         description: first name of admin user
 *         in: in
 *         required: true
 *         type: string
 *       - name: lastName
 *         description: last name of admin user
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: email of admin user used for authentication
 *         in: path
 *         required: true
 *         type: string
 *       - name: password
 *         description: admin's password.
 *         in: query
 *         required: true
 *         type: string
 *      - in: header
 *        name: token
 *        description: For Adding Token into Headers
 *        type: string
 *        required: true


*/
module.exports = router;
