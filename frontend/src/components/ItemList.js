import React from 'react'
import {Card} from 'antd'
// import { useDispatch } from "react-redux";

const ItemList = ({order}) => {
const {Meta} = Card;

// const dispatch = useDispatch();
// //update cart handler
// const handleAddTOCart = () => {
//   dispatch({
//     type: "ADD_TO_CART",
//     payload: { ...item, quantity: 1 },
//   });
// };
  return (
    <div> 
      <Card
      hoverable
      className='ant-card'
      >
        <Meta title={order} />
        <div className="item-button">
        {/* <Button onClick={() => handleAddTOCart()}>Add to cart</Button> */}
        </div>
      </Card>
    </div>
  )
}

export default ItemList