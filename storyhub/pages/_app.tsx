import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Navbar from '../components/NavBar';
import AppPage from '../app/page';
import 'bootstrap/dist/css/bootstrap.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      setIsLoggedIn(storedLoginStatus === 'true');
    }
    const fetchedApiUrl = 'https://testappexpress-bc7835aaf320.herokuapp.com';
    setApiUrl(fetchedApiUrl);
  }, []);
  
  console.log(apiUrl)
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} />
      {/* <AppPage /> */}
      <Component {...pageProps} isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={handleLogout} apiUrl={apiUrl}/>
    </div>
  );
}

export default MyApp;