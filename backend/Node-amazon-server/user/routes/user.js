const express = require("express");
const db = require("../../db");
const config = require("../../config");
const utils = require("../../utils");
const crypto = require("crypto-js");
// // const mailer = require("../../mailer");
// const uuid = require("uuid");
const fs = require("fs");
// const path = require("path");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ---------------------------------------
//                  GET
// ---------------------------------------
//Get user profile
router.get("/", (request, response) => {
  const statement = `SELECT id, firstName, lastName, address, city, state, country, zip, phone, email, active FROM user
  WHERE id = ${request.userId}`;

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

// ---------------------------------------
//                  POST
// ---------------------------------------

router.post("/signup", (request, response) => {
  const { firstName, lastName, email, password } = request.body;

  //   const activationToken = uuid.v4();
  //   const activationLink = `http://localhost:4000/user/activate/${activationToken}`;

  //   const htmlPath = path.join(
  //     __dirname,
  //     "/../templates/send_activation_link.html"
  //   );
  //   let body = "" + fs.readFileSync(htmlPath);
  //   body = body.replace("firstName", firstName);
  //   body = body.replace("activationLink", activationLink);

  const statement = `insert into user (firstName, lastName, email, password) values (
      '${firstName}', '${lastName}', '${email}', '${crypto.SHA256(password)}'
    )`; //activationToken , '${activationToken}'
  db.query(statement, (error, data) => {
    // mailer.sendEmail(email, "Welcome to mystore", body, (error, info) => {
    //   console.log(error);
    //   console.log(info);
    response.send(utils.createResult(error, data));
  });
});
// });

router.post("/signin", (request, response) => {
  const { email, password } = request.body;
  const statement = `select id, firstName, lastName, active from user where email = '${email}' and password = '${crypto.SHA256(
    password
  )}'`;
  db.query(statement, (error, users) => {
    if (error) {
      response.send({ status: "error", error: error });
    } else if (users.length == 0) {
      response.send({ status: "error", error: "user does not exist" });
    } else {
      const user = users[0];
      if (user["active"] == 1) {
        // user is an active user
        const token = jwt.sign({ id: user["id"] }, config.secret);
        response.send(
          utils.createResult(error, {
            firstName: user["firstName"],
            lastName: user["lastName"],
            token: token,
          })
        );
      } else {
        // user is a suspended user
        response.send({
          status: "error",
          error: "your account is not active. please contact administrator",
        });
      }
    }
  });
});
// ---------------------------------------
//                  PUT
// ---------------------------------------

//Get user profile
router.put("/edit-profile", (request, response) => {
  const { firstName, lastName, address, city, state, country, zip, phone } =
    request.body;
  const statement = `UPDATE user set firstName = '${firstName}', lastName = '${lastName}', address = '${address}', city = '${city}', state = '${state}', country = '${country}', zip = '${zip}', phone = '${phone}'
  WHERE id = ${request.userId}`;

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
