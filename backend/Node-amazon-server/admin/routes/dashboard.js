const express = require("express");
const utils = require("../../utils");
const db = require("../../db");
const dbPromise = require("../../dbpromise");
const router = express.Router();

//---------------------------------
//              GET
//---------------------------------
//get number of users
router.get("/all-count", (request, response) => {
  let data = {
    totalUser: 0,
    totalProduct: 0,
    totalOrder: 0,
    activeOrder: 0,
    totalBrands: 0,
    totalCategories: 0,
  };
  try {
    (async () => {
      /**--------------------------------------------------------------------- */
      //Get All data in single query

      // const statement = `SELECT
      // (SELECT COUNT(*) FROM user) as totalUser,
      // (SELECT COUNT(*) FROM product) as totalProduct,
      // (SELECT COUNT(*) FROM userorder) as totalOrder,
      // (SELECT COUNT(*) FROM userorder WHERE deliveryStatus NOT IN ('Cancelled', 'Delivered')) as activeOrder,
      // (SELECT COUNT(*) FROM brand) as totalBrands,
      // (SELECT COUNT(*) FROM category) as totalCategories
      // FROM DUAL`;

      //   db.query(statement, (error, data) => {
      //     response.send(utils.createResult(error, data));
      //   });

      /**--------------------------------------------------------------------- */

      //get user count
      const userStatement = `SELECT COUNT(id) AS totalUser FROM user`;
      const [usersCount] = await dbPromise.execute(userStatement);
      data.totalUser = usersCount[0]["totalUser"];
      //get product count
      const productStatement = `SELECT COUNT(id) AS totalProduct FROM product`;
      const [productsCount] = await dbPromise.execute(productStatement);
      data.totalProduct = productsCount[0]["totalProduct"];

      //get order count
      const orderStatement = `SELECT COUNT(id) AS totatOrder FROM userorder`;
      const [orderCount] = await dbPromise.execute(orderStatement);
      data.totalOrder = orderCount[0]["totatOrder"];

      //get active order count
      const activeStatement = `SELECT COUNT(id) AS activeOrder FROM userorder WHERE deliveryStatus NOT IN ('Cancelled', 'Delivered')`;
      const [activeOrder] = await dbPromise.execute(activeStatement);
      data.activeOrder = activeOrder[0]["activeOrder"];

      //get brand count
      const brandStatement = `SELECT COUNT(id) AS totalBrands FROM brand`;
      const [brandCount] = await dbPromise.execute(brandStatement);
      data.totalBrands = brandCount[0]["totalBrands"];

      //get category count
      const categoryStatement = `SELECT COUNT(id) AS totalCategories FROM category`;
      const [categoryCount] = await dbPromise.execute(categoryStatement);
      data.totalCategories = categoryCount[0]["totalCategories"];

      response.send(utils.createSuccess(data));
    })();
  } catch (error) {
    console.log("Error While getting Admin dashboard details" + error);
    response.send(utils.createError(error));
  }
});

// //get number of users
// router.get("/user-count", (request, response) => {
//   const statement = `SELECT COUNT(id) AS totalUser FROM user`;
//   db.query(statement, (error, data) => {
//     response.send(utils.createResult(error, data));
//   });
// });

// //get number of products
// router.get("/product-count", (request, response) => {
//   const statement = `SELECT COUNT(id) AS totalProduct FROM product`;
//   db.query(statement, (error, data) => {
//     response.send(utils.createResult(error, data));
//   });
// });

// //get total number of orders
// router.get("/order-count", (request, response) => {
//   const statement = `SELECT COUNT(id) AS totatOrder FROM userorder`;
//   db.query(statement, (error, data) => {
//     response.send(utils.createResult(error, data));
//   });
// });

// //get total number of orders
// router.get("/active-order-count", (request, response) => {
//   const statement = `SELECT COUNT(id) AS activeOrder FROM userorder WHERE deliveryStatus NOT IN ('Cancelled', 'Delivered')`;
//   db.query(statement, (error, data) => {
//     response.send(utils.createResult(error, data));
//   });
// });

// //get total number of categories
// router.get("/category-count", (request, response) => {
//   const statement = `SELECT COUNT(id) AS totalCategories FROM category`;
//   db.query(statement, (error, data) => {
//     response.send(utils.createResult(error, data));
//   });
// });

// //get total number of categories
// router.get("/brand-count", (request, response) => {
//   const statement = `SELECT COUNT(id) AS totalBrands FROM brand`;
//   db.query(statement, (error, data) => {
//     response.send(utils.createResult(error, data));
//   });
// });
module.exports = router;
