import React, { useState, useEffect } from "react";
import DefaultLayout from "../components/DefaultLayout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    DeleteOutlined,
    PlusCircleOutlined,
    MinusCircleOutlined,
} from "@ant-design/icons";
import { Table, Button, Modal, message, Form} from "antd";
const CartPage = ({item}) => {
    const [subTotal, setSubTotal] = useState(0);
    const [subQuantity, setSubQuantity] = useState(1);
    const [billPopup, setBillPopup] = useState(false);
    const [state, setState] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.rootReducer);
    //handle increament
    const handleIncreament = (record) => {
        dispatch({
            type: "UPDATE_CART",
            payload: { ...record, quantity: record.quantity + 0.5 },
        });
    };
    const handleDecreament = (record) => {
        if (record.quantity !== 0.5) {
            dispatch({
                type: "UPDATE_CART",
                payload: { ...record, quantity: record.quantity - 0.5 },
            });
        }
    };





    const changeQuantity = (e) => {
        setSubQuantity(e.target.value)
    }




    const FinalSubmit = (e, record) => {
        const var1 = parseFloat(document.getElementById("change_quantity").value)
        setSubQuantity(var1)
        record.quantity = var1

        dispatch({
            type: "UPDATE_CART",
            payload: { ...record, quantity: record.quantity },
        });

        document.getElementById(record._id).style.display = "block"
        setSubQuantity(1);

    }




    const columns = [
        { title: "Name", dataIndex: "name" },
        { title: "Price", dataIndex: "price" },
        {
            title: "Quantity",
            dataIndex: "_id",
            render: (id, record) => (
                <div>
                    <PlusCircleOutlined
                        className="mx-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleIncreament(record)}
                    />
                    <b>{record.quantity}</b>
                    <MinusCircleOutlined
                        className="mx-3"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDecreament(record)}
                    />
                </div>
            ),
        },
        {
            title: "Change Quantity",
            dataIndex: "_id",
            render: (id, record) => (
                <div>
                    <div style={{ position: "relative" }}>
                        <div style={{ position: "absolute" }} id={record._id}>
                            <button style={{ width: "224px" }} onClick={() => document.getElementById(record._id).style.display = "none"}>Change Quantity</button>
                        </div>
                        <div>
                            <form>
                                <input
                                    key={id}
                                    type="number" step={0.5}
                                    id="change_quantity"
                                    name={record._id}
                                    defaultValue={1}
                                    value={subQuantity}
                                    onChange={event => changeQuantity(event, id, record)}
                                    required
                                />
                                <button type="submit" onClick={event => FinalSubmit(event, record)} > Submit </button>

                            </form>
                        </div>
                    </div>
                </div >
            ),
        },
        {
            title: "Actions",
            dataIndex: "_id",
            render: (id, record) => (
                <DeleteOutlined
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                        dispatch({
                            type: "DELETE_FROM_CART",
                            payload: record,
                        })
                    }
                />
            ),
        },
    ];

    useEffect(() => {
        let temp = 0;
        cartItems.forEach((item) => (temp = temp + item.price * item.quantity));
        setSubTotal(temp);
    }, [subQuantity, cartItems]);

    //handleSubmit
    const handleSubmit = async () => {
        try {
            const newObject = {
                cartItems,
                subTotal,
                totalAmount: Number(subTotal
                ),
                userId: JSON.parse(localStorage.getItem('auth')),
            };
            console.log(newObject);
            await axios.post("http://localhost:8080/api/order/add-order", newObject);
            message.success("order Generated");
            dispatch({ type: "CLEAR_CART" });
            navigate("/");
        } catch (error) {
            message.error("Something went wrong");
            console.log(error);
        }
    };

    const [itemsData, setItemsData] = useState([]);
    useEffect(() => {
        const getAllItems = async () => {
            try {
                dispatch({
                    type: "SHOW_LOADING",
                });
                const { data } = await axios.get('http://localhost:8080/api/items/get-item');
                setItemsData(data);
                dispatch({ type: "HIDE_LOADING" });
            } catch (error) {
                console.log(error);
            }
        }
        getAllItems();
    }, [dispatch])

    //update cart handler
const handleAddTOCart = () => {
    const a=document.getElementById("test12345").value
    console.log(a)
    const element=itemsData.filter((e)=>{
       
            return e.name===a 
    })
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...element[0], quantity: 1 },
    });
  };

    return (
        <DefaultLayout>

            <div className='us-states'>
                <input list='us_state'id="test12345" placeholder='Add Food Item' value={state} onChange={e => setState(e.target.value)} required />
                <datalist id='us_state'>
                    {itemsData.map((itemsData, i) => (
                        <option key={i} >
                            <div className="test"><p>{itemsData.name}</p> </div>
                        </option>
                    ))}
                </datalist>
                <Button onClick={() => handleAddTOCart()}>Add</Button>
            </div>


            <h1 style={{marginTop:"4rem"}}>Create Bill</h1>
            <Table columns={columns} dataSource={cartItems} bordered />
            <div className="d-flex flex-column align-items-end">
                <hr />
                <h3>
                    TOTAL : ₹ <b> {subTotal}</b> /-{" "}
                </h3>
                <Button type="primary" onClick={() => setBillPopup(true)}>
                    Create Order
                </Button>
            </div>
            <Modal
                title="Create Invoice"
                visible={billPopup}
                onCancel={() => setBillPopup(false)}
                footer={false}
            >
                <Form layout="vertical" onFinish={handleSubmit}>
                    {/* <Form.Item name="customerName" label="Customer Name">
                        <Input />
                    </Form.Item>
                    <Form.Item name="customerNumber" label="Contact Number">
                        <Input />
                    </Form.Item>

                    <Form.Item name="paymentMode" label="Payment Method">
                        <Select>
                            <Select.Option value="cash">Cash</Select.Option>
                            <Select.Option value="card">Card</Select.Option>
                            <Select.Option value="upi">UPI</Select.Option>
                        </Select>
                    </Form.Item> */}
                    <div className="bill-it">
                        <h3>
                            TOTAL:{" "}
                            <b>
                                ₹{Number(subTotal)}
                            </b>
                        </h3>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button type="primary" htmlType="submit">
                            Generate Bill
                        </Button>
                    </div>
                </Form>
            </Modal>
        </DefaultLayout>
    );
};

export default CartPage;