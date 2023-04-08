var express = require("express");
const mongoose = require("mongoose");
const app = express();
var dotenv = require("dotenv");
var bodyparse = require("body-parser");
dotenv.config();
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
app.use(bodyparse.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("home");
});

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

require("./Routes/FileManager")(app);
require("./Routes/Account")(app);
