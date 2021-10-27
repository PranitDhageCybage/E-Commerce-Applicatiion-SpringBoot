const express = require("express");
const db = require("../../db");
const dbPromise = require("../../dbpromise");
const utils = require("../../utils");

const router = express.Router();

// ---------------------------------------
//                  GET
// ---------------------------------------
router.get("/", (request, response) => {
  const statement = `SELECT u.id, a.address, a.city, a.state, a.country, a.pin,
  u.totalAmount, u.tax, u.paymentType, u.paymentStatus, u.deliveryStatus, SUBSTRING(u.createdOn, 1, 10) AS createdOn
  FROM userOrder u
  INNER JOIN address a ON u.addressId = a.id
  WHERE u.userId = ${request.userId}`;

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

// Get order details using orderId
router.get("/details/:orderId", (request, response) => {
  const { orderId } = request.params;
  const statement = `SELECT o.id, o.orderId, o.productId, p.title, o.price, o.quantity,
  o.totalAmount, u.deliveryStatus, SUBSTRING(o.createdOn, 1, 10) AS createdOn 
  FROM orderdetails o
  INNER JOIN product p ON o.productId = p.id
  INNER JOIN userorder u ON o.orderId = u.id
  WHERE orderId = ${orderId}`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});
// ---------------------------------------
//                  POST
// ---------------------------------------

router.post("/", (request, response) => {
  try {
    const {
      addressId,
      totalAmount,
      tax,
      paymentType,
      paymentStatus,
      deliveryStatus,
    } = request.body;
    (async () => {
      // await dbPromise.execute("SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
      // console.log("Finished setting the isolation level to read committed");
      //set wait timeout and lock wait timeout as per need.
      // await dbPromise.beginTransaction();

      // Step 1 : Add order to userOrder
      const statementOrder = `insert into userOrder (addressId, totalAmount, tax, paymentType, paymentStatus, deliveryStatus, userId) values (
    ${addressId}, ${totalAmount}, ${tax}, '${paymentType}', '${paymentStatus}', '${deliveryStatus}', ${request.userId})`;
      const [myorder] = await dbPromise.query(statementOrder);

      // Step 2 : Get Order Id
      const orderId = myorder["insertId"];

      //Step 3: Get All Cart Items and insert into orderDetails Table
      const statementCart = `SELECT productId, price, quantity, totalAmount FROM cart WHERE userId = ${request.userId}`;
      const [cartItems] = await dbPromise.execute(statementCart);

      // Step 4: Insert All cart items to orderdetails
      for (const item of cartItems) {
        const orderDetailsStatement = `insert into orderDetails (orderId, productId, price, quantity, totalAmount) values (
          ${orderId}, ${item["productId"]}, ${item["price"]}, ${item["quantity"]}, ${item["totalAmount"]})`;
        await dbPromise.execute(orderDetailsStatement);
      }

      //Step 5: Empty cart
      const cartStatement = `DELETE FROM cart WHERE userId = ${request.userId}`;
      await dbPromise.execute(cartStatement);

      // await dbPromise.commit();
      response.send(utils.createSuccess("placed order"));
    })();
  } catch (error) {
    console.log("Error While Passing Order" + error);
    // dbPromise.rollback();
    response.send(utils.createError(error));
  }
});

// ---------------------------------------
//                  PUT
// ---------------------------------------
router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { status } = request.body;
  const statement = `UPDATE userOrder SET deliveryStatus = '${status}' WHERE id = ${id}`;

  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

module.exports = router;
