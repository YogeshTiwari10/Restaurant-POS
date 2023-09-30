const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotanv = require("dotenv");


//rest object
const app = express();

//middlwares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));


const connectDb = require("./config/config");

//dotenv config
dotanv.config();

//db config
connectDb();

//routes
app.use("/api/items", require("./routes/itemRoutes"));
app.use("/api/bills", require("./routes/billsRoutes"));
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));

app.use("/",(req,res) => {
    res.send("<h1> Restraunt Backend </h1>")
});

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});