/* eslint-disable no-restricted-globals */
import React, { useState, useEffect } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios';
import { useDispatch } from "react-redux";
import {
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { message, Modal, Button} from "antd";
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [count, setCount] = useState(0);
  const [billPopup, setBillPopup] = useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState();
  const [addmenuitem, setAddmenuitem] = useState({});

  const navigate = useNavigate();
  const getAllItems = async (item) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      const { data } = await axios.get('http://localhost:8080/api/order/get-order');
      setItemsData(data);
      // console.log(data)
      setCount(Object.keys(data).length);
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllItems();
  }, [dispatch])

  const time = (now) => {
    const a = new Date(now);
    const b = a.getHours() + ':' + a.getMinutes();
    return b;
  }

  //handle Order Item deleet
  const handleItemDelete = async (record, element) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      // console.log(record,element)
      await axios.post("http://localhost:8080/api/order/cartdelete-order", { "orderId": element, "ItemId": record });
      message.success("Item Deleted Succesfully");
      dispatch({ type: "HIDE_LOADING" });
      getAllItems();
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  };
  //handle Order delete
  const handleDeleteOrder = async (record) => {
    try {
      dispatch({
        type: "SHOW_LOADING",
      });
      await axios.post("http://localhost:8080/api/order/delete-order", { orderId: record });
      // console.log(record)
      getAllItems();
      message.success("Item Deleted Succesfully");
      dispatch({ type: "HIDE_LOADING" });
    } catch (error) {
      dispatch({ type: "HIDE_LOADING" });
      message.error("Something Went Wrong");
      console.log(error);
    }
  };

  // Handle Completed Order
  const handleCompletedOrder = async (record, element) => {
    try {
      // console.log(record);
      await axios.post("http://localhost:8080/api/bills/add-bills", record);
      message.success("order Generated");
      handleDeleteOrder(record._id);
      navigate("/bills");
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  };



  // Handle Add Order Item
  const handleItemAdd = async () => {
    try {
      // console.log(record);
      setBillPopup(true);



      // const newObject = {
      //   cartItems,
      //   userId: generateRandomString(16),
      // };
      // console.log(typeof(newObject))
      // console.log(newObject)

      // console.log(addmenuitem)
      // console.log(addmenuitem)
      // const b={"_id":addmenuitem._id,"name":"Ak","price":34,"category":"noodles","date":Date.now(),"quantity":2}
      // await axios.post("http://localhost:8080/api/order/itemadd-order", {"order":record,"item":b});
      // message.success("order Generated");
      // navigate("/bills");
    } catch (error) {
      message.error("Something went wrong");
      console.log(error);
    }
  }


  const handleAddTOCart = async () => {
    const a = document.getElementById("test123456").value
    const element = foodItems.filter((e) => {

      return e.name === a
    })
    const b = { "_id": element[0]._id, "name": element[0].name, "price": element[0].price, "category": element[0].category, "date": element[0].date, "quantity": 1 }
    await axios.post("http://localhost:8080/api/order/itemadd-order", { "order": addmenuitem, "item": b });
    message.success("order Generated");
    navigate("/");
    setBillPopup(false)
    getAllItems();
  };


  const [foodItems, setFoodItems] = useState([]);
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: "SHOW_LOADING",
        });
        const { data } = await axios.get('http://localhost:8080/api/items/get-item');
        setFoodItems(data);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        console.log(error);
      }
    }
    getAllItems();
  }, [dispatch])

  const [subQuantity, setSubQuantity] = useState(0);
  useEffect(() => {
    let temp = 0;
    itemsData.map(item => (
      item.cartItems.map(i => (
        temp = temp + (i.price * i.quantity)
      ))
    ))
    setSubQuantity(temp);
  }, [itemsData]);

  const [getquantity, setGetquantity] = useState(1)
  const [getedititem, setGetedititem] = useState({})
  const [getprevitem, setGetprevitem] = useState({})
  const [getchangeform, setGetchangeform] = useState(false)

  // handle edit item

  const handleEditItem = async (event) => {
    event.preventDefault();
    setGetchangeform(false);
    const b = { "_id": getprevitem._id, "name": getprevitem.name, "price": getprevitem.price, "category": getprevitem.category, "date": getprevitem.date, "quantity": getquantity }
    // console.log(b)
    await axios.post("http://localhost:8080/api/order/edititem-order", { "order": getedititem, "item": b });
    message.success("Item Edited Successfully");
    navigate("/");
    getAllItems();
    
  }

  return (
    <DefaultLayout>
      {/* <div className="search-container">
        <form className='search_button'>
          <input
            type="string"
            id='search'
            placeholder='Search'
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <Link to={`/searched/${values.keyword}`} style={{ textDecoration: "none" }}> <button>Search</button> </Link>
        </form>
      </div> */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "2rem", fontSize: "30px", fontWeight: "600" }}> Order List</div>
      <div className="products-container">
        {
          itemsData.map((item, i) => (
            <article className="product-card">
              <div className="order-heading">
                <h1>Order: {count - i}</h1>
                <h1>Time: {time(item.date)}</h1>
              </div>
              <br />
              <div id="bot">
                <div id="table">
                  <table>
                    <tbody>
                      <tr className="tabletitle1">
                        <td className="item">
                          <h2>Item</h2>
                        </td>
                        <td className="Hours">
                          <h2>Qty</h2>
                        </td>
                        <td className="Rate">
                          <h2>Price</h2>
                        </td>
                        <td className="Rate">
                          <h2>Total</h2>
                        </td>
                        <td className="Rate">
                          <h2>Actions</h2>
                        </td>
                      </tr>
                      {item.cartItems.map(a => (
                        <>
                          <tr className="service">
                            <td className="tableitem">
                              <p className="itemtext1">{a.name}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext1">{a.quantity}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext1">{a.price}</p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext1">
                                {a.quantity * a.price}
                              </p>
                            </td>
                            <td className="tableitem">
                              <p className="itemtext1">


                                {

                                  <div>
                                    <EditOutlined
                                      style={{ cursor: "pointer" }}
                                      onClick={() => {
                                        setGetedititem(item)
                                        setGetprevitem(a)
                                        setGetchangeform(true)
                                      }}
                                    />
                                    <DeleteOutlined
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleItemDelete(a._id, item._id)
                                      }
                                    />
                                  </div>

                                }
                              </p>
                            </td>
                          </tr>
                        </>
                      ))}

                      <tr className="tabletitle">
                        <td />
                        <td />
                        <td className="Rate">

                        </td>

                      </tr>
                      <tr className="tabletitle">
                        <td />
                        <td />
                        <td className="Rate1">
                          Grand Total
                        </td>
                        <td className="payment1">

                          ₹{subQuantity}

                        </td>
                        <td></td>
                      </tr>
                      <br />
                      <tr className="">
                        <td className="item">
                          <button onClick={() => {
                            setAddmenuitem(item)
                            handleItemAdd()
                          }
                          }> Add Item</button>
                        </td>
                        <td className="Hours">
                          {/* <h2>Edit</h2> */}
                        </td>
                        <td className="Rate">
                          <button onClick={() =>
                            handleDeleteOrder(item._id)}> Delete</button>
                        </td>
                        <td className="Rate">
                          {/* <h2>Delete</h2> */}
                        </td>
                        <td className="Rate">
                          <button onClick={() =>
                            handleCompletedOrder(item)}>Completed</button>

                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>
          ))
        }
      </div>

      <Modal
        title="Create Invoice"
        visible={billPopup}
        onCancel={() => setBillPopup(false)}
        footer={false}
      // onFinish={handleSubmitaddcartItems}
      >
        <div className='us-states'>
          <input list='us_state' id="test123456" placeholder='Add Food Item' value={state} onChange={e => setState(e.target.value)} required />
          <datalist id='us_state'>
            {foodItems.map((itemsData, i) => (
              <option key={i} >
                <div className="test"><p>{itemsData.name}</p> </div>
              </option>
            ))}
          </datalist>
          <Button onClick={() => handleAddTOCart()}>Add</Button>

        </div>
      </Modal>

      <Modal
        title="Create Invoice"
        visible={getchangeform}
        onCancel={() => setGetchangeform(false)}
        footer={false}
      >
        <form style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
          <label> Enter New Quantity</label>
            <input type="number" value={getquantity} onChange={(e => setGetquantity(e.target.value))} />
            <button onClick={handleEditItem}> Submit </button>
        </form>
      </Modal>

      {/* <Modal
                title="Create Invoice"
                visible={newdata}
                onCancel={() => setNewdata(false)}
                footer={false}
                // onFinish={handleSubmitaddcartItems}
            >
              <h1>Confirm</h1>
              <button onClick={() => finalok()}> Confirm </button>
              </Modal> */}

      {/* <Row>
        {itemsData
          .filter((i) => i.category === selecedCategory)
          .map((item) => (
            <Col xs={24} lg={6} md={12} sm={6}>
              <ItemList key={item.id} item={item} />
            </Col>
          ))}
      </Row> */}
    </DefaultLayout>
  )
}

export default Homepage