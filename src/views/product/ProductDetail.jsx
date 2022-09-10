import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/v1/product/${id}`)
            console.log(response);
            setProduct(response.data.data)
          } catch (error) {
            console.error(error);
          }
        }
        getData();
      }, [id]);


  return (
    <div>
    <button onClick={() => navigate(-1)}>Go Back</button>
        <h2>Product </h2>

        {product && (
        <div>
          <h4>Product name: {product.title}</h4>
          <p>
            <img width="250px" src={product.images} alt={`Pic of ${product.title}`} />
          </p>
          <p>Description: {product.description}</p>
          <p>Details: {product.details}</p>
          <p>Price: {product.price}</p>
          
          
        </div>
        )}
      {!product && <p>Product not found</p>}
    
    </div>
  )
}
