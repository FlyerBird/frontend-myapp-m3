import React from 'react';
import AllProducts from './product/AllProducts';
import Header from '../components/Header';

export default function Home() {
  return (
    <div>
      <Header />
      <div className='mainBoxHome'>
      <AllProducts />
      </div>
    </div>
  )
}
