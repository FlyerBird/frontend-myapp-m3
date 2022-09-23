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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/upload`, uploadData);
      setImages(prev => [...prev, response.data.fileUrl]);
      setImgForAdmin(prev => [...prev, e.target.files[0].name]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
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
      const newProduct = await axios.post(`${process.env.REACT_APP_API_URL}/product`, productToSend, { headers: { Authorization: `Bearer ${storedToken}` } } );
      toast.success('Product created successfully')
      navigate(`/product/${newProduct.data.data._id}`)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='createProduct'>
    <div className='headerCreateProduct'>
      <h2>Create Product</h2>
    </div>
      <form onSubmit={handleSubmit}>
        <div className='createProductFormSections'>
          <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} />
        </div>
        <div className='createProductFormSections'>
          <input className='bigger' type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} />
        </div>
        <div className='createProductFormSections'>
          <input  type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
        </div>
        <div className='createProductFormSections'>
          <input className='bigger2' type="text" name="details" placeholder="Details" value={product.details} onChange={handleChange} />
        </div>
        {imgForAdmin && (
          <ul >
            {imgForAdmin.map((elem, i) => {
              return <li key={i}>{elem}</li>
            })}
          </ul>
          )}
        <div className='file-select' id='src-file1' >
          <input type="file" onChange={(e) => handleFileUpload(e)} />
        </div>
        
        <button className='createProButton' type="submit">Save</button>
      </form>
    </div>
  )
}
