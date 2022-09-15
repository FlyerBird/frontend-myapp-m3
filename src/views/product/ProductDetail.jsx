import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLeftLong } from '@fortawesome/free-solid-svg-icons';
//import { AuthContext } from '/src/context/AuthContext';


export default function Product() {
  const storedToken = localStorage.getItem('authToken')
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
   // const { isAdmin } = useContext(AuthContext);
  

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
          await axios.delete(`http://localhost:8000/api/v1/product/${id}`,  { headers: { Authorization: `Bearer ${storedToken}` } });
          toast.success('Product deleted')
          navigate("/");
        } catch (error) {
          console.error(error);
        }
      };


  return (
    <div className='productDetail'>
    <div className='back'>
      <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faLeftLong} /></button>
    </div>
        {product && (
        <div className='detailPro'>
          <h4>Product name: {product.title}</h4>
            <img width="300px" src={product.images} alt={`Pic of ${product.title}`} />
          <p>Description: {product.description}</p>
          <p>Details: {product.details}</p>
          <p>Price: {product.price}</p>
        <div>
          <button onClick={handleDelete}>Delete product</button> 
        </div>
        </div>
        )}
      {!product && <p>Product not found</p>}
    
    </div>
  )
}
