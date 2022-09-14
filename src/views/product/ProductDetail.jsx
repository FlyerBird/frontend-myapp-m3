import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
//import { AuthContext } from '/src/context/AuthContext'
//import { AuthContext } from '../context/AuthContext';

export default function Product() {
  const storedToken = localStorage.getItem('authToken')
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
   // const { isLoggedIn, isAdmin } = useContext(AuthContext);

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

    const handleDelete = async () => {
        try {
          await axios.delete(`http://localhost:8000/api/v1/product/${id}`, product, { headers: { Authorization: `Bearer ${storedToken}` } });
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      };


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
          
         <button onClick={handleDelete}>Delete product</button>
        </div>
        )}
      {!product && <p>Product not found</p>}
    
    </div>
  )
}
