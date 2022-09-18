import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCartArrowDown, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext'


export default function Product() {
  const storedToken = localStorage.getItem('authToken')
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const { isAdmin } = useContext(AuthContext);
  

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await axios.get(`http://localhost:8000/api/v1/product/${id}`)
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

      
      const addToCart = async (productId) => {
        try{
          const cart = await axios.post(`${process.env.REACT_APP_API_URL}/cart`, {productId}, { headers: { Authorization: `Bearer ${storedToken}` }})
          console.log(cart)
          toast('Added to Cart')
          navigate('/cart');
        } catch(error) {
          console.error(error);
          navigate('/login');
        }
       };
      


  return (
    <div className='productDetail'>
    <div className='back'>
      <button onClick={() => navigate(-1)}><FontAwesomeIcon icon={faCaretLeft} /></button>
    </div>
        {product && (
        <div className='detailPro'>
        <div className='slider'>
          {product.images.length > 1? product.images.map((img,i) => <img className='eachDI' key={i} width="300px" src={img} alt={`Pic of ${product.title}`} />) : <img width="300px" src={product.images} alt={`Pic of ${product.title}`} />}
        </div>
        <div className='detailText'>
          <h3>{product.title}</h3>
          <h4>TECHNICAL FEATURES</h4>
          <p>{product.details}</p>
          <p className='detailPrice'>{product.price} €</p>
          </div>
        <div className='detailProActions'>
          {isAdmin&&<Link to= {`/edit/${id}`}><FontAwesomeIcon icon={faPenToSquare} />Edit Product</Link> }
          {isAdmin&&<button className='deleteDetailButton' onClick={handleDelete}><FontAwesomeIcon icon={faTrash} /> Delete product</button> }
          {!isAdmin&&<button className='buyDetailButton' onClick={()=> addToCart(product._id) } type='submit'><b><FontAwesomeIcon icon={faCartArrowDown} /> Cart</b></button>}
        </div>
        </div>
        )}
      {!product && <p>Product not found</p>}
    
    </div>
  )
}
