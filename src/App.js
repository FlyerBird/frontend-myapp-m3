import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import CreateProduct from './views/CreateProduct';
import ProductDetail from './views/ProductDetail';
import AllProducts from './views/AllProducts';

function App() {
  return (
    <div className="App">
      <Toaster/>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path='/product' element={<AllProducts />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Navbar />
    </div>
  );
}

export default App;
