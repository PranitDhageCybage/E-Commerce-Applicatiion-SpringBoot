const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const { secret } = require("./config");
const cors = require("cors");

//Swagger for API Documentation
const swaggerJSDocs = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Routers
const adminRouter = require("./admin/routes/admin");
const brandRouter = require("./admin/routes/brand");
const categoryRouter = require("./admin/routes/category");
const orderRouter = require("./admin/routes/order");
const productRouter = require("./admin/routes/product");
// const reviewRouter = require('./admin/routes/review')
const userRouter = require("./admin/routes/user");
const dashboardRouter = require("./admin/routes/dashboard");
// Middleware
const app = express();
app.use(cors("*"));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
const www = process.env.WWW || "./";

app.use(express.static(www));
console.log(`serving ${www}`);

//Swagger Init
const swaggerOptions = {
  definition: {
    info: {
      title: "Amazon Server (Admin Panel)",
      version: "1.0.0",
      description: "This is Express Server for Admin Panel",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Admin Development server",
      },
    ],
  },
  apis: ["./admin/routes/*.js"],
};
const swaggerSpec = swaggerJSDocs(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// add a middleware for getting the id from token
function getUserId(request, response, next) {
  if (
    request.url == "/admin/signin" ||
    request.url == "/admin/signup" ||
    request.url.startsWith("/product/image")
  ) {
    //Do not check for token
    next();
  } else {
    try {
      const token = request.headers["token"];
      const data = jwt.verify(token, secret);

      // Addd new key named userId with logged in User in request
      request.userId = data["id"];

      // Go to actual route
      next();
    } catch (error) {
      response.status(401);
      response.send({ status: "error", error: "Protected API" });
    }
  }
}
app.use(getUserId);

// // Add the routes
app.use("/admin", adminRouter);
app.use("/brand", brandRouter);
app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
// app.use('/review', reviewRouter)
app.use("/user", userRouter);
app.use("/dashboard", dashboardRouter);

app.get("/", (req, res) => {
  res.sendFile(`index.html`, { root: www });
});
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
