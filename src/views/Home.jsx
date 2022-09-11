import React from 'react';
import AllProducts from './product/AllProducts';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function Home() {
  return (
    <div>
      <Header />
      <div className='mainBoxHome'>
      <SearchBar />
      <AllProducts />
      </div>
    </div>
  )
}
