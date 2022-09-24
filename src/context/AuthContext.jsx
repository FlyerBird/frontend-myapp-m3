import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartContext, setCartContext] = useState("");
  const navigate = useNavigate();

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  }

  const removeToken = () => {
    localStorage.removeItem('authToken');
  }

  const authenticateUser = async () => {
    setLoading(true);
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, { headers: { Authorization: `Bearer ${storedToken}` } });
        setIsLoggedIn(true);
        setLoading(false);
        setUser(response.data);
        setIsAdmin(response.data.role === 'admin' ? true : false)
      } catch (error) {
        setIsLoggedIn(false);
        setLoading(false);
        setUser(null);
        setIsAdmin(null)
      }
    } else {
      setIsLoggedIn(false);
      setLoading(false);
      setUser(null);
      setIsAdmin(null)
    }
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
    navigate('/')
  }

  useEffect(() => {
    authenticateUser();
    getCart();
  }, []);

 
  const getCart = async () => {
    const storedToken = localStorage.getItem('authToken');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/cart`, { headers: { Authorization: `Bearer ${storedToken}` } });
      setCartContext(response.data.data[0].products) 
    } catch (error) {
      console.error(error)
    }
  }
 
  const updateCart = async () => {
    try {
      await getCart()
    } catch (error) {
      console.error(error)
    }
  }
  
  return ( 
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, isAdmin, storeToken, authenticateUser, logOutUser, removeToken, getCart, updateCart, cartContext }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };

