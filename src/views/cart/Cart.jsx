import React, {useEffect, useState, useContext} from 'react';
import { AuthContext } from "../../context/AuthContext";

export default function Cart() {
  const [products, setProducts] = useState(null);
  const { getCart, cart } = useContext(AuthContext);
// de context rebras cart, useeffect lunic que fa es agafar cart i fer setproducts(cart)
useEffect (() => {
  setProducts(cart)
}
,[cart])
  // array dependencies cart
  

  return (
    <div>
    {products && products.map((product, i) => {
      return <div key={product._id + i}>
      <p>{product.title}</p>
      <p>{product.price}</p>
      </div>
    })}
    {!products && <p>No products</p>}
    </div>
  )
}
