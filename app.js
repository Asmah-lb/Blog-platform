const path = require('path');

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');

dotenv.config({ path: "./config.env" });

const userRouter = require("./routes/userRoute.js");
const postRouter = require("./routes/postRoute.js");


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')))

const databaseUrl = process.env.DB_STRING;
const port = process.env.PORT||3001;

app.use(function (req, res, next) {
  console.log("I am fetching...");
  next();
});


//MOUNTING ROUTE
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);


//================================//
mongoose
  .connect(databaseUrl)
  .then(function (con) {
    console.log("Database connected successfully....");
  })
  .catch(function (error) {
    console.log(error.message);
  });

//===========================//
app.listen(port, function () { 
  // i removed "localhost" after port,
  console.log(`App is listening on a port ${port}`);
});
