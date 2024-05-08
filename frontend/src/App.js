import 'antd/dist/reset.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import ErrorPage from './pages/ErrorPage';
import CartPage from './pages/CartPage';
import BillsPage from './pages/BillsPage';
import Inventory from './pages/Inventory';
import Searched from './pages/Searched';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homepage />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path='/searched/:slug' element={<Searched />} />
          <Route path="/items" element={<ItemPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/bills" element={<BillsPage />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;