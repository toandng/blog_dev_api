require("module-alias/register");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/db/models");
const path = require("path");
const router = require("@/routes/api");
const app = express();

const errorHandler = require("@/middlewares/errors/errorHandler");
const notFoudHandler = require("@/middlewares/errors/notFoundHandler");
// cors
app.use(cors());

// cau hình router đến public
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/v1/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/v1", router);

app.use(notFoudHandler);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("hello");
});
