const mongoose = require("mongoose");

const inventorySchema = mongoose.Schema(
  {
    date: {
        type: Date,
        default: () => Date.now(),
      },
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    
  },
  { timestamp: true }
);

const inventory = mongoose.model("Inventory", inventorySchema);

module.exports = inventory;