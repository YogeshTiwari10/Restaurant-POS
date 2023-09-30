const billsModel = require("../models/billsModel");

//add items
const addBillsController = async (req, res) => {
  try {
    const newBill = new billsModel(req.body);
    await newBill.save();
    res.send("Bill Created Successfully!");
  } catch (error) {
    res.send("something went wrong");
    console.log(error);
  }
};

//get bills data
const getBillsController = async (req, res) => {
  try {
    const bills = await billsModel.find().sort ( { date: -1 } );
    res.send(bills);
  } catch (error) {
    console.log(error);
  }
};


//delete item
const deleteBillsController = async (req, res) => {
  try {
    const { itemId } = req.body;
    console.log(itemId);
    await billsModel.findOneAndDelete({ _id: itemId });
    res.status(200).json("item Deleted");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

module.exports = {
  addBillsController,
  getBillsController,
  deleteBillsController,
};