const express = require("express");
const utils = require("../../utils");
const db = require("../../db");

const router = express.Router();

//---------------------------------------------------------------
//                          GET
//---------------------------------------------------------------
//Get All user's orders
router.get("/user-order", (request, response) => {
  const statement = `SELECT o.id, o.userId, u.firstName, o.totalAmount, o.tax, o.paymentType, o.paymentStatus, o.deliveryStatus, SUBSTRING(o.createdOn, 1, 10) AS createdOn FROM userOrder o
  INNER JOIN user u ON o.userId = u.id`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

// Get order details using orderId
router.get("/details/:orderId", (request, response) => {
  const { orderId } = request.params;
  const statement = `SELECT o.id, o.orderId, o.productId, p.title, o.price, o.quantity, o.totalAmount, SUBSTRING(o.createdOn, 1, 10) AS createdOn 
  FROM orderdetails o
  INNER JOIN product p ON o.productId = p.id
  WHERE orderId = ${orderId}`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

//Chnage Delivery Status
router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { status } = request.body;
  const statement = `UPDATE userOrder SET deliveryStatus = '${status}'WHERE id = '${id}'`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
