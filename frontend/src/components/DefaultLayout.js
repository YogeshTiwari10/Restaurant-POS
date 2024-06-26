import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux";
import { Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../assets";
import Spinner from "./Spinner";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FormOutlined,
  HomeOutlined,
  CopyOutlined,
  SnippetsOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "../styles/DefaultLayout.css";
const { Header, Sider, Content } = Layout;

const DefaultLayout = ({children}) =>  {
  const navigate = useNavigate();
  const { cartItems, loading } = useSelector((state) => state.rootReducer);
  const [collapsed, setCollapsed] = useState(false);
  

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  //to get localstorage data
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

    return (
      <Layout>
        {loading && <Spinner />}
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" style={{display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
            <img src={Logo} style={{width:"80px", borderRadius:"20px", marginTop:"10px"}}/>
            <h1 className="text-center text-light font-wight-bold mt-4">GROCERY MANAGEMENT SYSTEM</h1>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={window.location.pathname}
          >
            <Menu.Item key="/home" icon={<HomeOutlined />}>
              <Link to="/home" style={{textDecoration:"none"}}>Home</Link>
            </Menu.Item>
            <Menu.Item key="/customers" icon={<FormOutlined />}>
              <Link to="/cart" style={{textDecoration:"none"}}> Create Bill</Link>
            </Menu.Item>
            <Menu.Item key="/bills" icon={<CopyOutlined />}>
              <Link to="/bills" style={{textDecoration:"none"}}>Bills</Link>
            </Menu.Item>
            <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
              <Link to="/items" style={{textDecoration:"none"}}>Items List</Link>
            </Menu.Item>
            <Menu.Item key="/inventory" icon={<SnippetsOutlined />}>
              <Link to="/inventory" style={{textDecoration:"none"}}>Inventory</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: toggle,
              }
            )}
            <div
            className="cart-item d-flex jusitfy-content-space-between flex-row"
            onClick={() => navigate("/cart")}
          >
            <p>{cartItems.length}</p>
            <ShoppingCartOutlined />
          </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  
}

export default DefaultLayout;