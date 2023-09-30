const express = require("express");
const {
    getInventoryController, 
    addInventoryController, 
    deleteInventoryController, 
    editInventoryController
} = require("./../controllers/inventoryController");

const router = express.Router();

//routes
//Method - get
router.get("/get-inventory", getInventoryController);

//MEthod - POST
router.post("/add-inventory", addInventoryController);

//method - PUT
router.put("/edit-inventory", editInventoryController);

//method - DELETE
router.post("/delete-inventory", deleteInventoryController);

module.exports = router;