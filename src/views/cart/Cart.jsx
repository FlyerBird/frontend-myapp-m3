import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Cart() {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const productsCart = await axios.get(`${process.env.REACT_APP_API_URL}/product-cart`);
        setProducts(productsCart.data.data);
        console.log(productsCart.data.data)
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);
  

  return (
    <div>Cart</div>
  )
}
