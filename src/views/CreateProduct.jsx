import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateProduct() {
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    details: '',
    images: ''
  });

  const handleChange = (e) => {
    setProduct(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = await axios.post('http://localhost:8000/api/v1/product', product, { headers: { Authorization: `Bearer ${storedToken}` } } );
      navigate(`/product/${newProduct.data.data._id}`)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} />
        <input type="text" name="description" placeholder="Description" value={product.image} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={product.year} onChange={handleChange} />
        <input type="text" name="details" placeholder="Details" value={product.director} onChange={handleChange} />
        <input type="text" name="images" placeholder="Images" value={product.synopsis} onChange={handleChange} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
