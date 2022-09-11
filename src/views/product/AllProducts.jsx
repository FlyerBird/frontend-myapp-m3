import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCartArrowDown } from '@fortawesome/free-solid-svg-icons'


export default function AllProducts() {
    const [products, setProducts] = useState(null);
   
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
    <div className='allProducts'>
        {products && products.map(product => {
            return (
                <div className='eachProduct' key={product._id} >
                    <Link to={`/product/${product._id}`}>
                    <div>
                        <img className='imgProduct' width={200} src={product.images} alt={product.title}/>
                    </div>
                    <div className='textProduct'>
                        <h3>{product.title}</h3>
                        <p className='productPrice'>{product.price} €</p>
                        <p className='productDescription'>{product.description}</p>
                    <div className='linkPro'>
                        <Link to={`/product/${product._id}`}><b><FontAwesomeIcon icon={faEye} /> Details</b></Link>
                        <Link to={`/login`}><b><FontAwesomeIcon icon={faCartArrowDown} /> Buy</b></Link>
                    </div>
                    </div>
                    </Link>
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
