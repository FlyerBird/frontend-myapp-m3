import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CreateProduct() {
  const storedToken = localStorage.getItem('authToken');
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    details: ''
  });

  const [images, setImages] = useState([]);
  const [imgForAdmin, setImgForAdmin] = useState([]);

  const handleChange = (e) => {
    setProduct(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  };

  const handleFileUpload = async(e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/projects/upload`, uploadData);
      console.log(response.data.fileUrl);

      setImages(prev => [...prev, response.data.fileUrl]);
      setImgForAdmin(prev => [...prev, e.target.files[0].name]);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    console.log(product);
    console.log(images);
  }, [product, images])

  const handleSubmit = async (e) => {
    e.preventDefault();

    //In case of multiple file upload
    const productToSend = {
    title: product.title,
    description: product.description,
    price: product.price,
    details: product.details,
    images: images
    }

    try {
      const newProduct = await axios.post('http://localhost:8000/api/v1/product', productToSend, { headers: { Authorization: `Bearer ${storedToken}` } } );
      toast.success('Product created successfully')
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
        <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
        <input type="text" name="details" placeholder="Details" value={product.details} onChange={handleChange} />
        {imgForAdmin && (
          <ul>
            {imgForAdmin.map((elem, i) => {
              return <li key={i}>{elem}</li>
            })}
          </ul>
          )}
        <input type="file" onChange={(e) => handleFileUpload(e)} />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}
