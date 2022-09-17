import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCartArrowDown, faMagnifyingGlass, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function AllProducts() {
    const storedToken = localStorage.getItem('authToken')
    const [products, setProducts] = useState(null);
    const [searchProduct, setSearchProduct] = useState("");
    const [filteredProducts, setfilteredProducts] = useState(null);
    const [showLinks, setShowLinks] = useState(false); 
    
    const handleSort = () => {
     setShowLinks(showLinks => !showLinks);
   };
    
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/product`);
                setProducts(response.data.data);
                setfilteredProducts(response.data.data);
            } catch (error) {
                console.log(error)
            }
        }
        getData();
    }, []);

    const handleSearch = (e) => {
        setSearchProduct(e.target.value)
        if (e.target.value === '') {
            setfilteredProducts(products)
        } else {
          const filtered = products.filter(el => el.title.toLowerCase().includes((e.target.value).toLocaleLowerCase()))
          setfilteredProducts(filtered)
        }
      };

      const handleMoreExpensive = () => {
        const ordered = [...products].sort((a, b) => b.price - a.price);
        setfilteredProducts(ordered)
       }

       const handleCheaper = () => {
        const ordered = [...products].sort((a, b) => a.price - b.price);
        setfilteredProducts(ordered)
       }

       const addToCart = async (productId) => {
        const cart = await axios.post(`${process.env.REACT_APP_API_URL}/cart`, {productId}, { headers: { Authorization: `Bearer ${storedToken}` }})
        console.log(cart)
       }
      
  return (
    <div className='searchAndProducts'>
       <div className='searchBar'>
            <div className='search'>
             <FontAwesomeIcon className='iconGlass' icon={faMagnifyingGlass} />
             <input type="text" value={searchProduct} placeholder="What are you looking for?" onChange={handleSearch} />
        </div>
        <div className='sort'>
        <button className='sortByPrice' onClick={handleSort}> Sort by Price {!showLinks ? <FontAwesomeIcon className='sortIcon' icon={faChevronDown} /> : <FontAwesomeIcon icon={faChevronUp} />}</button>
        <div className='sortPrice' id={showLinks ? "hidden" : ""}>
            <button onClick={handleMoreExpensive}>More expensive</button>
            <button onClick={handleCheaper}>Cheaper</button>
        </div>
        </div>
       </div>

    <div className='allProducts'>
   
        {filteredProducts && filteredProducts.map(product => {
            return (
                <div className='eachProduct' key={product._id} >
                    <Link to={`/product/${product._id}`}>
                    <div>
                    {Array.isArray(product.images) ? <img className='imgProduct' width="300px" src={product.images[0]} alt={`Pic of ${product.title}`} /> : <img className='imgProduct' width="300px" src={product.images} alt={`Pic of ${product.title}`} />}
                    </div>
                    <div className='textProduct'>
                        <h3>{product.title}</h3>
                        <p className='productPrice'>{product.price} €</p>
                        <p className='productDescription'>{product.description}</p>
                    </div>
                    </Link>
                    <div className='linkPro'>
                        <Link to={`/product/${product._id}`}><b><FontAwesomeIcon icon={faEye} /> Details</b></Link>
                     
                            <button onClick={()=> addToCart(product._id)} type='submit'><b><FontAwesomeIcon icon={faCartArrowDown} /> Buy</b></button>
                     
                        
                        
                    </div>
                </div>
            )
      })}

      {!products && 
        <div className='loading'>
            <p>Loading...</p>
            <img className='loadingGif' src='https://media2.giphy.com/media/dyAf7IKSw1IMXd0gSj/giphy.gif?cid=6c09b952ulpnr5r5wb0hvlxqxo9lkfn3sn5y2xemrxo8hvc1&rid=giphy.gif&ct=s' alt='loadingGif'/> 
        </div>}
    </div>
    </div>
  )
}
