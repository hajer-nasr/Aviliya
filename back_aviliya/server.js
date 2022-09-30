const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

const UserRoute = require("./Routes/UserRoutes");
const HotelRoute = require("./Routes/HotelRoutes");
const ReviewRoute = require("./Routes/ReviewRoutes");

dotenv.config();
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Connection to DataBase
mongoose
  .connect(process.env.DB_CONNECT, connectionParams)
  .then(() => {
    console.log("Connected to database ");
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

//MiddleWares
const app = express();

app.use(express.json());

app.use(morgan("dev"));
app.options("*", cors());
app.use(cors());
app.use("/user", UserRoute);
app.use("/hotel", HotelRoute);
app.use("/review", ReviewRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server is running on port : ", PORT);
});
