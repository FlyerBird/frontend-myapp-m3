import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function AllProducts() {
    const [products, setProducts] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/v1/product');
                setProducts(response.data.data);
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, []);


  return (
    <div className='allProducs'>
        <button onClick={() => navigate(-1)}>Go Back</button>
        {products && products.map(product => {
            return (
                <div className='eachProduct' key={product._id} >
                <Link to={`/product/${product._id}`}>
                <div className='imgProduct'>
                    <img width={200} src={product.images} alt={product.title}/>
                </div>
                <div className='textProduct'>
                <h2>{product.title}</h2>
                <p className='productDescription'>{product.description}</p>
                <p className='productPrice'>{product.price}</p>
                </div>
                </Link>
                <button onClick={() => navigate(`/product/${product._id}`)}>Details</button>
                <button>Carrito</button>
                </div>
            )
      })}
      {!products && 
        <div className='loading'>
            <p>Loading...</p>
            <img className='loadingGif' src='https://media2.giphy.com/media/dyAf7IKSw1IMXd0gSj/giphy.gif?cid=6c09b952ulpnr5r5wb0hvlxqxo9lkfn3sn5y2xemrxo8hvc1&rid=giphy.gif&ct=s' alt='loadingGif'/> 
        </div>}

    </div>
  )
}
