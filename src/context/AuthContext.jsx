import React, { useState, createContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthProviderWrapper(props) {
  // Store the variables we want to share
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Functions to store and delete the token received by the backend in the browser
  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  }

  const removeToken = () => {
    localStorage.removeItem('authToken');
  }

  // Function to check if the user is already authenticated or not (and isAdmin or not)
  const authenticateUser = async () => {
    setLoading(true);
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/me`, { headers: { Authorization: `Bearer ${storedToken}` } });
        console.log(response.data)
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
  }, []);

  useEffect(() => {
    console.log(user);
    console.log(isAdmin);
  })
  
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoading, isAdmin, storeToken, authenticateUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext };

