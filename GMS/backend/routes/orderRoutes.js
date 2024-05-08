const express = require("express");
const {
  getOrderController,
  addOrderController,
  itemaddOrderController,
  editOrderController,
  deleteOrderController,
  deleteCartOrderController,
  itemEditOrderController,
} = require("./../controllers/orderController");

const router = express.Router();

//routes
//Method - get
router.get("/get-order", getOrderController);

//Method - get
// router.post("/get-itemSearched", getSearchedItemController);

//MEthod - POST
router.post("/add-order", addOrderController);

//MEthod - POST
router.post("/itemadd-order", itemaddOrderController);

//MEthod - POST
router.post("/edititem-order", itemEditOrderController);

//method - PUT
router.put("/edit-order", editOrderController);

//method - DELETE
router.post("/delete-order", deleteOrderController);

//method - DELETE
router.post("/cartdelete-order", deleteCartOrderController);

module.exports = router;