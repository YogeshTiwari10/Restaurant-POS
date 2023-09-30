const inventoryModel = require("../models/inventoryModel");

// get items
const getInventoryController = async (req, res) => {
  try {
    const inventory = await inventoryModel.find().sort ( { date: -1 } );
    res.status(200).send(inventory);
    console.log(inventory)
  } catch (error) {
    console.log(error);
  }
};

//add items
const addInventoryController = async (req, res) => {
  try {
    const newInventory = new inventoryModel(req.body);
    await newInventory.save();
    res.status(201).send("Item Created Successfully!");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

//update item
const editInventoryController = async (req, res) => {
  try {
    const { inventoryId } = req.body;
    console.log(inventoryId);
    await inventoryModel.findOneAndUpdate({ _id: inventoryId }, req.body, {
      new: true,
    });

    res.status(201).json("item Updated");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//delete item
const deleteInventoryController = async (req, res) => {
  try {
    const { inventoryId } = req.body;
    console.log(inventoryId);
    await inventoryModel.findOneAndDelete({ _id: inventoryId });
    res.status(200).json("item Deleted");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

module.exports = { getInventoryController, addInventoryController, deleteInventoryController, editInventoryController };