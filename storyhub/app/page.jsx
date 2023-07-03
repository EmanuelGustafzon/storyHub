import React from 'react';
import HomePage from '../pages/HomePage';
import Navbar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.css';
const AppPage = () => {
  return (
    <div>
      <Navbar/>
      <HomePage />
    </div>
  );
};

export default AppPage;



