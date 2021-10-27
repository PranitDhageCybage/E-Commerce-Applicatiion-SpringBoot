const express = require("express");
const utils = require("../../utils");
const db = require("../../db");
const dbpromise = require("../../dbpromise");
const fs = require("fs");

//Multer for image Upload
const multer = require("multer");
const upload = multer({ dest: "images/" });

// For deleting older Image
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const router = express.Router();

//---------------------------------------------------------------
//                          GET
//---------------------------------------------------------------
//Getting Images

/**
 * @swagger
 *
 * /product/image/{filename}:
 *   get:
 *     description: For getting Product Image
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
router.get("/image/:filename", (request, response) => {
  const { filename } = request.params;
  const file = fs.readFileSync(__dirname + "/../../images/" + filename);
  response.send(file);
});

//Get Product Details with id
/**
 * @swagger
 *
 * /product/details/{id}:
 *   get:
 *     description: For getting Product With Id
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
router.get("/details/:id", (request, response) => {
  const { id } = request.params;
  const statement = `
        SELECT p.id, p.title, p.description,
            c.id AS categoryId, c.title AS categoryTitle,
            b.id AS brandId, b.title AS brandTitle,
            p.price, p.image, p.isActive FROM product p
        INNER JOIN category c ON c.id = p.category
        INNER JOIN BRAND b ON b.id = p.brand
        WHERE p.id = '${id}'
    `;
  db.query(statement, (error, data) => {
    if (error) {
      response.send(utils.createResult(error));
    } else {
      // Make empty Products object Array
      const products = [];

      // Iterate over the colllection and modify products
      for (let index = 0; index < data.length; index++) {
        const tempProduct = data[index];
        const product = {
          id: tempProduct["id"],
          title: tempProduct["title"],
          description: tempProduct["description"],
          price: tempProduct["price"],
          isActive: tempProduct["isActive"],
          brand: {
            id: tempProduct["brandId"],
            title: tempProduct["brandTitle"],
          },
          category: {
            id: tempProduct["categoryId"],
            title: tempProduct["categoryTitle"],
          },
          image: tempProduct["image"],
        };
        products.push(product);
      }
      response.send(utils.createSuccess(products));
    }
  });
});

//Get All Product Details
/**
 * @swagger
 *
 * /product/details:
 *   get:
 *     description: For getting All Product
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
router.get("/details", (request, response) => {
  const statement = `
          SELECT p.id, p.title, p.description,
              c.id AS categoryId, c.title AS categoryTitle,
              b.id AS brandId, b.title AS brandTitle,
              p.price, p.image, p.isActive FROM product p
          INNER JOIN category c ON c.id = p.category
          INNER JOIN BRAND b ON b.id = p.brand
      `;
  db.query(statement, (error, data) => {
    if (error) {
      response.send(utils.createResult(error));
    } else {
      // Make empty Products object Array
      const products = [];

      // Iterate over the colllection and modify products
      for (let index = 0; index < data.length; index++) {
        const tempProduct = data[index];
        const product = {
          id: tempProduct["id"],
          title: tempProduct["title"],
          description: tempProduct["description"],
          price: tempProduct["price"],
          isActive: tempProduct["isActive"],
          brand: {
            id: tempProduct["brandId"],
            title: tempProduct["brandTitle"],
          },
          category: {
            id: tempProduct["categoryId"],
            title: tempProduct["categoryTitle"],
          },
          image: tempProduct["image"],
        };
        products.push(product);
      }
      response.send(utils.createSuccess(products));
    }
  });
});

//---------------------------------------------------------------
//                          POST
//---------------------------------------------------------------
//Add new Product
/**
 * @swagger
 *
 * /product/create:
 *   post:
 *     description: For Adding new Product
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: product
 *        description: For Adding new Product
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - category
 *          - price
 *          - brand
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          category:
 *            type: integer
 *          price:
 *            type: integer
 *          brand:
 *            type: integer
 *      - in: header
 *        name: token
 *        description: For Adding Token into Headers
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: successful message
 */
router.post("/create", (request, response) => {
  const { title, description, category, price, brand } = request.body;
  const statement = `INSERT INTO product (title, description, category, price, brand) VALUES(
      '${title}', '${description}', '${category}', '${price}', '${brand}'
      )`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

/**
 * @swagger
 *
 * /product/dummy-create-product:
 *   post:
 *     description: For Adding new Product
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: title
 *         description:  name of product
 *         in: formData
 *         required: true
 *         type: string
 *       - name: description
 *         description: description of product
 *         in: formData
 *         required: true
 *         type: string
 *       - name: category
 *         description: product category
 *         in: formdata
 *         required: true
 *         type: integer
 *       - name: price
 *         description: product price
 *         in: formData
 *         required: true
 *         type: integer
 *       - name: brand
 *         description: product brand
 *         in: formData
 *         required: true
 *         type: integer
 *       - in: header
 *         name: token
 *         description: For Adding Token into Headers
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: successful message
 */

router.post("/dummy-create-product", (request, response) => {
  response.send("This is Dummy Sign up");
});

/**
 * @swagger
 *
 * /product/upload-image/{productId}:
 *   post:
 *     description: For Uploading Product Image
 *     produces:
 *       - multipart/form-data
 *     parameters:
 *       - name: productImage
 *         description:  image of product
 *         in: formData
 *         required: true
 *         type: file
 *       - in: header
 *         name: token
 *         description: For Adding Token into Headers
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: successful message
 */
router.post(
  "/upload-image/:productId",
  upload.single("productImage"),
  async (request, response) => {
    const { productId } = request.params;
    const fileName = request.file.filename;

    //Delete old image if present
    let oldImage = null;
    const stmnt = `SELECT * FROM product WHERE id = '${productId}'`;
    const [products] = await dbpromise.execute(stmnt);

    for (const product of products) {
      oldImage = product["image"];
    }

    if (oldImage) {
      try {
        await unlinkAsync("./images/" + `${oldImage}`);
      } catch (error) {
        console.log("Error in Unlink Image : " + error);
      }
    }
    //Update new image
    const statement = `UPDATE product SET image = '${fileName}' WHERE id = '${productId}'`;
    await dbpromise.execute(statement);
    response.send({ status: "success" });
  }
);
//---------------------------------------------------------------
//                          PUT
//---------------------------------------------------------------
//Update Product
/**
 * @swagger
 *
 * /product/{id}:
 *   put:
 *     description: For Updating Product
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: Product
 *        description: For Updating Product
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - category
 *          - price
 *          - brand
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          category:
 *            type: integer
 *          price:
 *            type: integer
 *          brand:
 *            type: integer
 *      - in: header
 *        name: token
 *        description: For Adding Token into Headers
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: successful message
 */
router.put("/:id", (request, response) => {
  const { id } = request.params;
  const { title, description, category, price, brand } = request.body;
  const statement = `UPDATE product SET title = '${title}', description = '${description}', category = '${category}', price = '${price}', brand = '${brand}'
        WHERE id = '${id}'
        `;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});

//Change isActive Status
/**
 * @swagger
 *
 * /product/update-state/{id}/{isActive}:
 *   put:
 *     description: For Updating Product Active Status
 *     produces:
 *       - application/json
 *     parameters:
 *      - in: body
 *        name: Product
 *        description: For Updating Product Active Status
 *        type: object
 *        required:
 *          - title
 *          - description
 *          - category
 *          - price
 *          - brand
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *          category:
 *            type: integer
 *          price:
 *            type: integer
 *          brand:
 *            type: integer
 *      - in: header
 *        name: token
 *        description: For Adding Token into Headers
 *        type: string
 *        required: true
 *     responses:
 *       200:
 *         description: successful message
 */
router.put("/update-state/:id/:isActive", (request, response) => {
  const { id, isActive } = request.params;
  const statement = `update product set 
        isActive = ${isActive}
      where id = ${id}`;
  db.query(statement, (error, data) => {
    response.send(utils.createResult(error, data));
  });
});
//---------------------------------------------------------------
//                          DELETE
//---------------------------------------------------------------
//Delete Product using id
/**
 * @swagger
 *
 * /product/{id}:
 *   delete:
 *     description: For Deleting Product
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
router.delete("/:productId", async (request, response) => {
  const { productId } = request.params;

  //Delete old image if present
  let oldImage = null;
  const stmnt = `SELECT * FROM product WHERE id = '${productId}'`;
  const [products] = await dbpromise.execute(stmnt);

  for (const product of products) {
    oldImage = product["image"];
  }

  if (oldImage) {
    try {
      await unlinkAsync("./images/" + `${oldImage}`);
    } catch (error) {
      console.log("Error in Unlink Image : " + error);
    }
  }
  const statement = `DELETE FROM product WHERE id = '${productId}'`;
  await dbpromise.execute(statement);
  response.send({ status: "success" });
});

module.exports = router;
