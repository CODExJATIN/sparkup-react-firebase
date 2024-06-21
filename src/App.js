import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignupPage from './components/Signup';
import LoginPage from './components/Login';
import ProfileSetup from './components/ProfileSetup/ProfileSetup';
import Homepage from './components/Homepage';
import ProfilePage from './components/ProfilePage';
import UserProfilePage from './components/ConnectionProfile';

function App() {

  function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };
  const userData = getUserData();

 


  
  return (
    

      < Routes>
        <Route path="/signup" element={<SignupPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/setup" element={<ProfileSetup/>} />
        <Route path="/" element={userData? <Homepage/>: <Navigate to='/login'/> }/>
        <Route path="/Myprofile" element = {userData? <ProfilePage/> : <Navigate to='/login'/>}/>
        <Route path="/profile/:userId" element={<UserProfilePage />} />
      </Routes>

    
  );
}

export default App;

