const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const config = require("./config");
const cors = require("cors");

//Routers
const userRouter = require("./user/routes/user");
const orderRouter = require("./user/routes/order");
const productRouter = require("./user/routes/product");
const cartRouter = require("./user/routes/cart");
const categoryRouter = require("./user/routes/category");
const addressRouter = require("./user/routes/address");

const app = express();
app.use(cors("*"));
app.use(bodyParser.json());

const port = process.env.PORT || 4000;
const www = process.env.WWW || "./";

app.use(express.static(www));

// add a middleware for getting the id from token
function getUserId(request, response, next) {
  if (
    request.url == "/user/signin" ||
    request.url == "/user/signup" ||
    request.url.startsWith("/user/activate") ||
    request.url == "/logo.png" ||
    request.url.startsWith("/product/image/") ||
    request.url.startsWith("/user/forgot-password")
  ) {
    // do not check for token
    next();
  } else {
    try {
      const token = request.headers["token"];
      const data = jwt.verify(token, config.secret);

      // add a new key named userId with logged in user's id
      request.userId = data["id"];

      // go to the actual route
      next();
    } catch (ex) {
      response.status(401);
      response.send({ status: "error", error: "protected api" });
    }
  }
}

app.use(getUserId);

// required to send the static files in the directory named images
app.use(express.static("images/"));

// add the routes
app.use("/user", userRouter);
app.use("/order", orderRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/category", categoryRouter);
app.use("/address", addressRouter);

console.log(`serving ${www}`);
app.get("/", (req, res) => {
  res.sendFile(`index.html`, { root: www });
});

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
