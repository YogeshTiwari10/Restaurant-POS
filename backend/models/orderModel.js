const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    totalAmount: {
      type: Number,
    },
    cartItems: {
      type: Array,
      required: true,
    },
    date: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { timestamp: true }
);

const Orders = mongoose.model("orders", orderSchema);

module.exports = Orders;