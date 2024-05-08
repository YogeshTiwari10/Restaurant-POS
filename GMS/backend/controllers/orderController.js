const orderModel = require("../models/orderModel");

// get items
const getOrderController = async (req, res) => {
  try {
    const orders = await orderModel.find().sort ( { date: -1 } );
    // console.log(Object.keys(orders).length)
    // const count = Object.keys(orders).length;
    // const data={"orders":orders,"count":count}
    res.status(200).send(orders);
  } catch (error) {
    console.log(error);
  }
};
// // get searched items
// const getSearchedItemController = async (req, res) => {
//   try {
//     console.log(req.body.slug);
//     const items = await itemModel.find().sort ( { date: -1 } );
    
//      const filterArr = items.filter((item)=>{
//       return(item.name.toLowerCase().includes(req.body.slug.toLowerCase()))
//     })
//     res.status(200).send(filterArr);
//   } catch (error) {
//     console.log(error);
//   }
// };

//add items
const addOrderController = async (req, res) => {
  try {
    const newOrder = new orderModel(req.body);
    console.log(newOrder)
    await newOrder.save();
    res.status(201).send("Item Created Successfully!");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

//add order items 
const itemaddOrderController = async (req, res) => {
  try {
    const {order,item} = req.body
    const arr=[...order.cartItems]
    arr.push(item)
    await orderModel.findOneAndUpdate({_id:order._id},{cartItems:arr})
    res.status(201).send("Item Created Successfully!");
  } catch (error) {
    res.status(400).send("error", error);
    console.log(error);
  }
};

// edit order item
const itemEditOrderController = async(req, res) => {
 try {
  const {order,item} = req.body
  // console.log(order)
  // console.log(item)
  const ids=order._id
  console.log(ids)


  const filterArr = order.cartItems.filter((i)=>{
          return(i._id!==item._id)
        })
filterArr.push(item)
        console.log(filterArr)
        await orderModel.findOneAndUpdate({_id:order._id},{cartItems:filterArr})
        res.status(201).send("Item Created Successfully!");
  
 } catch (error) {
  res.status(400).send(error);
    console.log(error);
 }
}

//update item
const editOrderController = async (req, res) => {
  try {
    const { OrderId } = req.body;
    console.log(OrderId);
    await orderModel.findOneAndUpdate({ _id: itemId }, req.body, {
      new: true,
    });
    res.status(201).json("item Updated");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

//delete item
const deleteOrderController = async (req, res) => {
  try {
    const { orderId } = req.body;
    console.log(orderId);
    await orderModel.findOneAndDelete({ _id: orderId });
    res.status(200).json("item Deleted");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};
//delete order item
const deleteCartOrderController = async (req, res) => {
  try {
    const { orderId,ItemId } = req.body;
    // console.log(orderId,ItemId);
    const a =await orderModel.findOne({ _id: orderId });
    // console.log(a)
    const b=a.cartItems.filter((i)=>{
            return i._id != ItemId
    })
    // console.log(b)
  await orderModel.findOneAndUpdate({_id:orderId},{cartItems:b})
    res.status(200).json("item Deleted");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

module.exports = {getOrderController, itemEditOrderController, editOrderController, deleteOrderController, addOrderController, deleteCartOrderController, itemaddOrderController };