import React, {useEffect, useState, useContext} from 'react';
import { AuthContext } from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons'
import { motion } from "framer-motion";

export default function Cart() {
  const storedToken = localStorage.getItem('authToken')
  const [products, setProducts] = useState(null);
  const { cartContext } = useContext(AuthContext);
  const navigate = useNavigate();
  //const[totalAmount, setTotalAmount] = useState ([]);
  
  const [cart, setCart] = useState("");

  const removeToken = () => {
    localStorage.removeItem('authToken');
  }

  useEffect (() => {
    setCart(cartContext)
  }
  ,[cartContext])
 
// de context rebras cart, useeffect lunic que fa es agafar cart i fer setproducts(cart)
useEffect (() => {
  setProducts(cartContext);
  //sum();
}
,[cartContext])
  // array dependencies cart


  const handleDelete = async (_id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/cart/${_id}`,  { headers: { Authorization: `Bearer ${storedToken}` } });
      toast.success('Product removed');
      removeToken();
    } catch (error) {
      console.error(error);
    }
  };

/*
  const sum = () => {
    const result = products.map(elem => elem.price).reduce((prev, curr)=> prev + curr, 0);
    setTotalAmount(result)
  }
  */


  return (
    <div>
      <div className='backFaq'>
        <motion.button 
          transition={{ duration: 1}}
          initial={{ x: 400}}
          animate={{ x: 0}}
          onClick={() => navigate(-1)}><h1 className='faqh1'>funRide</h1>
        </motion.button>
      </div>
    <div className='Cart'>
    <div className='checkout'>
      <h4>Checkout ({cart.length} products)</h4>
    </div>
      {products && products.map((product, i) => {
      return <div className='onEachProCart' key={product._id + i}>
        <div className='eachProductCart'>
          <div className='cartProductImg'>
            {Array.isArray(product.images) ? <img className='imgProductCart' src={product.images[0]} alt={`Pic of ${product.title}`} /> : <img className='imgProductCart' src={product.images} alt={`Pic of ${product.title}`} />}
          </div>
        <div className='cartProductTxt'>
          <p>{product.title}</p>
          <p className='cartEachPrice'>{product.price}€</p>
        </div>
        <div className='cartRemoveButton'>
          <button onClick={() => handleDelete(product._id)}><FontAwesomeIcon icon={faSquareXmark} /></button>
        </div>
      </div>
    </div>
    })}
    <div>Total : {} </div>
    <div>
      <button onClick={()=> navigate('/buyNow')} className='buyNow'>Buy now</button>
    </div>
    {!products && <p>No products</p>}
    </div>
    </div>
  )
}
