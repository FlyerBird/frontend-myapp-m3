import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function SearchBar() {
  const [products, setProducts] = useState(null);
  const [searchProduct, setSearchProduct] = useState("");

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


const handleSearch = (e) => {
  console.log(e.target.value)
  setSearchProduct(e.target.value)
  if (e.target.value === '') {
    setSearchProduct(searchProduct)
  } else {
    const filtered = products.filter(el => el.title.toLowerCase().includes((e.target.value)))
    setProducts(filtered)
  }
}

return (
  <div>
    <input type="text" value={searchProduct} placeholder="What are you looking for?" onChange={handleSearch} />
  </div>
  )
}
