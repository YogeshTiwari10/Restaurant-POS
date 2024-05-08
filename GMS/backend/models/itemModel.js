const mongoose = require("mongoose");

const itemSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    date: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { timestamp: true }
);

const Items = mongoose.model("Items", itemSchema);

module.exports = Items;