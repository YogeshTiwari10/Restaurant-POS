const mongoose = require("mongoose");

const billSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
    },
    customerNumber: {
      type: Number,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
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

const Bills = mongoose.model("bills", billSchema);

module.exports = Bills;