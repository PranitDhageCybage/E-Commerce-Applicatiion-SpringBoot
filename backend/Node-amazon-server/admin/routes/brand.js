const express = require("express");
const utils = require("../../utils");
const db = require("../../db");
const router = express.Router();

//---------------------------------
//              GET
//---------------------------------
//Get All Brands

/**
 * @swagger
 * /brand:
 *   get:
 *     description: For getting list of brands
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
  const statement = `SELECT id, title, description FROM brand`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

router.get("/:id", (request, response) => {
  const { id } = request.params;
  const statement = `SELECT id, title, description FROM brand WHERE id = ${id}`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

//---------------------------------
//              POST
//---------------------------------
//Add Brand

/**
 * @swagger
 *
 * /brand:
 *  post:
 *    description: For Adding new Brand
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: brand
 *        description: For Adding new Brand
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
  const statement = `INSERT INTO brand (title, description) VALUES ('${title}', '${description}')`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});
/**
 * @swagger
 *
 * /dymmy-add-brand:
 *  post:
 *    description: For Adding new Brand
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: title
 *        description: title of brand
 *        in: formData
 *        required: true
 *        type: string
 *      - name: description
 *        description: description of brand
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
router.post("/dummy-add-brand", (request, response) => {
  response.send("This is Dummy Sign in");
});

//---------------------------------
//              PUT
//---------------------------------
// Update Brand
/**
 * @swagger
 *
 * /brand/{id}:
 *  put:
 *    description: For Adding new Brand
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: brand
 *        description: For Adding new brand
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
  const statement = `UPDATE brand SET title = '${title}', description = '${description}' WHERE id = '${id}'`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

//---------------------------------
//              DELETE
//---------------------------------
//Delete Brand
/**
 * @swagger
 * /brand/{id}:
 *   delete:
 *     description: For getting list of brands
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
  const statement = `DELETE FROM brand WHERE id = '${id}'`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});
module.exports = router;
