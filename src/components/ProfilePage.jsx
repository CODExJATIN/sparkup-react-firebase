import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import CampaignIcon from '@mui/icons-material/Campaign';
import LogoutIcon from '@mui/icons-material/Logout';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import React from 'react';
import { useState } from 'react';
import ProfileDetails from './ProfileSetup/ProfileDetails';
import ConnectionDetails from './ProfileSetup/ConnectionDetails';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {

    const [isConnectionClicked, setIsConnectionClicked] = useState(false);
    const [isCampaignClicked, setIsCampaignClicked] = useState(false);
    const navigate = useNavigate();

    function connectionHandler(){
        setIsConnectionClicked(true);
        setIsCampaignClicked(false);
    }
    function campaignHandler(){
        setIsCampaignClicked(true);
        setIsConnectionClicked(false);
    }

    function homeHandler(){
        navigate('/'); 
    }

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


      //console.log(userData);

      function logoutHandler() {
        localStorage.removeItem('userData');
        window.location.href = '/login';
      }
     
    
  return (
    <div className='profile-page'>
        <div className="navigation active profile-bar">
            <div className="profile">
                <div className="imgBx">
                <img src={userData.photoURL? userData.photoURL: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg"} alt={`${userData.firstName}'s pfp`}/>
                </div>
                <div className='user-details'>
                <h3>{userData.firstName + ' ' + userData.lastName}</h3>
                <p><span><WorkIcon/></span>{userData.accountType}</p>
                <p><span><PlaceIcon/></span>{userData.location}</p>
                </div>
                
            </div>
            <ul className="menu">
                <li onClick={homeHandler}>
                <>
                    <span className="icon">
                    <HomeIcon/>
                    </span>
                    <span className="text">Home</span>
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
                <li onClick={connectionHandler}>
                <>
                    <span className="icon">
                    <ConnectWithoutContactIcon/>
                    </span>
                    <span className="text">My Connections</span>
                </>
                </li>
                <li onClick={campaignHandler}>
                <>
                    <span className="icon">
                    <CampaignIcon/>
                    </span>
                    <span className="text">My Campaigns</span>
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
        

        {isConnectionClicked? (<ConnectionDetails userId={userData.uid}/>):(<ProfileDetails userData={userData}/>)}
        
    </div>
  )
}

export default ProfilePage
