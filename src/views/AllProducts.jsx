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
                console.log(response)
                setProducts(response.data.data);
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, []);


  return (
    <div>
        {!products && <p>Loading...</p>}
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
    </div>
  )
}
