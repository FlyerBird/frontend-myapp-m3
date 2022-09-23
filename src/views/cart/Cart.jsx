import React, {useEffect, useState, useContext} from 'react';
import { AuthContext } from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function Cart() {
  const storedToken = localStorage.getItem('authToken')
  const [products, setProducts] = useState(null);
  const { cartContext } = useContext(AuthContext);
  const navigate = useNavigate();
  const[totalAmount, setTotalAmount] = useState ([])
 
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
    } catch (error) {
      console.error(error);
    }
  };


  const sum = () => {
    const result = products.map(elem => elem.price).reduce((prev, curr)=> prev + curr, 0);
    setTotalAmount(result)
  }
  


  return (
    <div className='Cart'>
      <div className='back'>
        <button button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faCaretLeft} /></button>
      </div>
      {products && products.map((product, i) => {
      return <div className='onEachProCart' key={product._id + i}>
        <div className='eachProductCart'>
          <div className='cartProductImg'>
            {Array.isArray(product.images) ? <img className='imgProductCart' src={product.images[0]} alt={`Pic of ${product.title}`} /> : <img className='imgProductCart' src={product.images} alt={`Pic of ${product.title}`} />}
          </div>
        <div className='cartProductTxt'>
          <p>{product.title}</p>
          <p>{product.price}€</p>
        </div>
        <div className='cartRemoveButton'>
          <button onClick={() => handleDelete(product._id)}>Remove</button>
        </div>
      </div>
      <div>Total : {totalAmount} </div>
    </div>
    })}
    {!products && <p>No products</p>}
    </div>
  )
}
