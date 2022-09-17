import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft  } from '@fortawesome/free-solid-svg-icons';

export default function EditProduct() {
  const storedToken = localStorage.getItem('authToken')
    const navigate = useNavigate();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getData = async () => {
          try {
            const product = await axios.get(`${process.env.REACT_APP_API_URL}/product/${id}`);
            setProduct(product.data.data);
          } catch (error) {
            console.error(error);
          }
        }
        getData();
      }, [id]);

      const handleChange = (e) => {
        setProduct(prev => {
          return {
            ...prev,
            [e.target.name]: e.target.value
          }
        })
        console.log(product)
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const newProduct= await axios.put(`${process.env.REACT_APP_API_URL}/product/${id}`, product, { headers: { Authorization: `Bearer ${storedToken}` } });
          navigate(`/product/${newProduct.data.data._id}`)
        } catch (error) {
          console.error(error);
        }
      }

  return (
    <div className='editPro'>
       <div className='back'>
        <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faCaretLeft} /></button>
      </div>
        {!product && <p>Loading...</p>}
        {product && (
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" placeholder="Product Name" value={product.title} onChange={handleChange} />
            <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} />
            <input type="text" name="details" placeholder="Details" value={product.details} onChange={handleChange} />
            <input type="text" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
            <button className='editButtonButton' type="submit">Save changes</button>
        </form>
    )}
    </div>
  )
}
