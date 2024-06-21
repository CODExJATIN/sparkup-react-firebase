import React from 'react';
import Navbar from './Navbar';
import { UserProvider } from '../context/userContext';
import {useState} from 'react';
import HorizontalBar from './HorizontalBar';
import userProfile from '../widgets/userProfile';
import UsersList from '../widgets/UserList';

const Homepage = () => {
  

  return (
    <div className='homePage'>
     <UserProvider>

     <div className='horizontalbar-container'>
        <HorizontalBar/>
      </div>


      <div className='main-box'>
        <div className='navbar-container'>
          <Navbar />
        </div>

        <div className='main-content'>
        <UsersList/>
        </div>
        

      </div>

      
    </UserProvider>
    </div>
    
  );
};

export default Homepage;
