const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotanv = require("dotenv");
const usersModel = require("./models/usersModel")


//rest object
const app = express();

//middlwares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));


const connectDb = require("./config/config");
const UsersModel = require("./models/usersModel");

//dotenv config
dotanv.config();

//db config
connectDb();

//routes
app.post('/register', (req, res) => {
  usersModel.create(req.body)
  .then(users => res.json(users))
  .catch(error => res.json(error))
})

app.post('/login', (req,res)=> {
  const {email, password} = req.body;
  usersModel.findOne({email: email})
  .then( user => {
    if(user){
      if(user.password === password){
        res.json("Success")
      }else{
        res.json("Incorrect password")
      }
    }else{
      res.json("user not found")
    }
  })
})
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