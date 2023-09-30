import React, { useState, useEffect} from 'react'
import DefaultLayout from '../components/DefaultLayout'
import axios from 'axios';
import {Row, Col} from 'antd'
import { useDispatch } from "react-redux";
import ItemList from '../components/ItemList';
import { Link, useParams } from 'react-router-dom';


const Searched = () => {const [itemsData, setItemsData] = useState([]);
    const [values, setValues] = useState([]);
    const {slug} = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
      const getAllItems = async () => {
        try {
          dispatch({
            type: "SHOW_LOADING",
          });  
            const {data} = await axios.post('http://localhost:8080/api/items/get-itemSearched', {"slug": slug});
            setItemsData(data);
            dispatch({ type: "HIDE_LOADING" });
        } catch (error) {
            console.log(error);
        }
      }
      getAllItems();
    }, [dispatch, slug])

    // useEffect(() => {
    //   const getAllItems = async () => {
    //     try {
    //       dispatch({
    //         type: "SHOW_LOADING",
    //       });  
    //         const {data} = await axios.get('http://localhost:8080/api/items/get-item');
    //         setItemsData(data);
    //         dispatch({ type: "HIDE_LOADING" });
    //     } catch (error) {
    //         console.log(error);
    //     }
    //   }
    //   getAllItems();
    // }, [dispatch])
    
  return (
    <DefaultLayout>
      <div className="search-container">
      <form className='search_button'>
          <input 
          type="string"
          id='search'
          placeholder='Search'
          value={values.keyword}
          onChange={(e) => setValues({...values, keyword: e.target.value})}
          />
         <Link to={`/searched/${values.keyword}`} style={{textDecoration:"none"}}> <button>Search</button> </Link>
        </form>
      </div>
        <Row>
            {
                itemsData.map(item => (
                    <Col xs={26} lg={8} md={14} sm={20}>
                    <ItemList item={item} />
                    </Col>
                ))
            }
        </Row>
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

export default Searched