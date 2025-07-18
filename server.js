require("module-alias/register");
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const router = require("@/routes/api");
const app = express();

const errorHandler = require("@/middlewares/errors/errorHandler");
const notFoudHandler = require("@/middlewares/errors/notFoundHandler");
// cors
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// cau hình router đến public
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/v1", router);
app.use(notFoudHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("hello");
});
