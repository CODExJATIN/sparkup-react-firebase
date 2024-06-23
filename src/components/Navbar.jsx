import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import CampaignIcon from '@mui/icons-material/Campaign';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {

  const navigate = useNavigate();
  function logoutHandler() {
    localStorage.removeItem('userData');
    window.location.href = '/login';
  }
  const [menuToggled, setMenuToggled] = useState(false);

  function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };
  const userData = getUserData();
  const photoUrl = userData.photoURL;
  console.log(photoUrl);

  const menuClickHandler = (e) => {
    e.stopPropagation();
    setMenuToggled(!menuToggled);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
  <div className={menuToggled? "navigation active": "navigation"}>
  <div className="menu_toggle" onClick={menuClickHandler}></div>
  <div className="profile">
    <div className="imgBx">
      <img src={photoUrl}/>
    </div>
  </div>
  <ul className="menu">
    <li onClick={()=>handleNavigation('/MyProfile')}>
      <>
        <span className="icon">
          <PersonIcon/>
        </span>
        <span className="text">Profile</span>
      </>
    </li>
    <li>
      <>
        <span className="icon">
          <ChatIcon/>
        </span>
        <span className="text">Inbox</span>
      </>
    </li>
    <li>
      <>
      <a href="https://sparkup-meetings.vercel.app/" className='meeting-link' target='_blank' rel="noreferrer">
      <span className="icon">
          <GroupsIcon/>
        </span>
        <span className="text">Meetings</span>
      </a>
      </>
    </li>
    <li>    
      <>
        <span className="icon">
          <ConnectWithoutContactIcon/>
        </span>
        <span className="text">Find Connections</span>
      </>
    </li>
    <li>
      <>
        <span className="icon">
          <CampaignIcon/>
        </span>
        <span className="text">Fundraising Campaigns</span>
      </>
    </li>
    <li onClick={logoutHandler}>
      <>
        <span className="icon">
          <LogoutIcon/>
        </span>
        <span className="text">Logout</span>
      </>
    </li>
  </ul>
</div>
  )
}

export default Navbar
