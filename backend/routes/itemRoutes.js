const express = require("express");
const {
  getItemController,
  addItemController,
  editItemController,
  deleteItemController,
  getSearchedItemController,
} = require("./../controllers/itemController");

const router = express.Router();

//routes
//Method - get
router.get("/get-item", getItemController);

//Method - get
router.post("/get-itemSearched", getSearchedItemController);

//MEthod - POST
router.post("/add-item", addItemController);

//method - PUT
router.put("/edit-item", editItemController);

//method - DELETE
router.post("/delete-item", deleteItemController);

module.exports = router;