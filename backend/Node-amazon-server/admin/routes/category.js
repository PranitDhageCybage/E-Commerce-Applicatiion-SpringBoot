const express = require("express");
const utils = require("../../utils");
const db = require("../../db");
const router = express.Router();

//---------------------------------
//              GET
//---------------------------------
//Get All categorys

/**
 * @swagger
 * /category:
 *   get:
 *     description: For getting list of categorys
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
router.get("/", (request, response) => {
  const statement = `SELECT id, title, description FROM category`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  const statement = `SELECT id, title, description FROM category WHERE id = ${id}`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

//---------------------------------
//              POST
//---------------------------------
//Add category

/**
 * @swagger
 *
 * /category:
 *  post:
 *    description: For Adding new category
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: category
 *        description: For Adding new category
 *        type: object
 *        required: true
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *      - in: header
 *        name: token
 *        description: For Adding Token into Headers
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Successful Message
 *
 */
router.post("/", (request, response) => {
  const { title, description } = request.body;
  const statement = `INSERT INTO category (title, description) VALUES ('${title}', '${description}')`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

/**
 * @swagger
 *
 * /dymmy-add-category:
 *  post:
 *    description: For Adding new category
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: title
 *        description: title of category
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        description: description of category
 *        in: formData
 *        required: true
 *        type: string
 *      - in: header
 *        name: token
 *        description: For Adding Token into Headers
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Successful Message
 *
 */
router.post("/dummy-add-category", (request, response) => {
  response.send("This is Dummy Sign in");
});
//---------------------------------
//              PUT
//---------------------------------
// Update category
/**
 * @swagger
 *
 * /category/{id}:
 *  put:
 *    description: For Adding new category
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: category
 *        description: For Adding new category
 *        type: object
 *        required: true
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *      - in: header
 *        name: token
 *        description: For Adding Token into Headers
 *        type: string
 *        required: true
 *    responses:
 *      200:
 *        description: Successful Message
 *
 */
router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { title, description } = request.body;
  const statement = `UPDATE category SET title = '${title}', description = '${description}' WHERE id = '${id}'`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

//---------------------------------
//              DELETE
//---------------------------------
//Delete category
/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     description: For getting list of categorys
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
router.delete("/:id", (request, response) => {
  const { id } = request.params;
  const statement = `DELETE FROM category WHERE id = '${id}'`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});
module.exports = router;
