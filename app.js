const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
dotenv.config({ path: ".env" });

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "API for quotes and authors. Check out the documentation below🐻",
    api_documentation:
      "https://documenter.getpostman.com/view/21884902/UzJQqEYA",
  });
});

app.use("/api/v1/quotes", require("./routes/quotes"));
app.use("/api/v1/authors", require("./routes/authors"));
app.use("/api/v1/users", require("./routes/users"));

module.exports = app;
