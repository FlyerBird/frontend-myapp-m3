import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faCartArrowDown, faMagnifyingGlass, faBars, faX } from '@fortawesome/free-solid-svg-icons';

export default function AllProducts() {
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
                const response = await axios.get('http://localhost:8000/api/v1/product');
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

      const handleSortByPrice = () => {
        const ordered = [...products].sort((a, b) => b.price - a.price);
        console.log(ordered)
        setfilteredProducts(ordered)
        //setProducts(prevProducts => {
           // console.log(prevProducts)
            //return [...prevProducts.sort((a, b) => b.price - a.price)]
        //})
      
       }
      
  return (
    <div className='searchAndProducts'>
       <div className='searchBar'>
            <div className='search'>
             <FontAwesomeIcon className='iconGlass' icon={faMagnifyingGlass} />
             <input type="text" value={searchProduct} placeholder="What are you looking for?" onChange={handleSearch} />
        </div>
        <div className='sort'>
        <div className='sortPrice' id={showLinks ? "hidden" : ""}>
            <button onClick={handleSortByPrice}>Sort by price</button>
            <button onClick={handleSort}> {!showLinks ? <FontAwesomeIcon icon={faBars} /> : <FontAwesomeIcon icon={faX} />}</button>
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
                        <Link to={`/login`}><b><FontAwesomeIcon icon={faCartArrowDown} /> Buy</b></Link>
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
