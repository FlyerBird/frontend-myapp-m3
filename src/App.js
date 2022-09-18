import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import CreateProduct from './views/product/CreateProduct';
import ProductDetail from './views/product/ProductDetail';
import AllProducts from './views/product/AllProducts';
import EditProduct from './views/product/EditProduct';
import UserProfile from './views/user/UserProfile';
import DeleteUser from './views/user/DeleteUser';
import Cart from './views/cart/Cart';
import Faq from './views/product/Faq';

function App() {
  return (
    <div className="App">
      <Toaster/>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserProfile />}/>
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path='/product' element={<AllProducts />} />
        <Route path='/edit/:id' element={<EditProduct />} />
        <Route path='/delete' element={<DeleteUser />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
