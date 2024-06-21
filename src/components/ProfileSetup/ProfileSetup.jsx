import React from 'react';
import { auth } from '../../firebase';
import StartupProfileSetup from './Startupform';
import InvestorProfileSetup from './Investorform';
import FundersProfileSetup from './Fundersform';
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const ProfileSetup = () => {
  function getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  };

  const userData = getUserData();
  const accountType = userData.accountType;
  const userId = userData.uid;

  console.log(userData);

  



  return (
    <div>
      {accountType === 'startup' && <StartupProfileSetup userId={userId} />}
      {accountType === 'investor' && <InvestorProfileSetup userId={userId} />}
      {accountType === 'funder' && <FundersProfileSetup userId={userId} />}
      {accountType === null && <div>Please Create account first to setup profile</div>}
    </div>
  );
};

export default ProfileSetup;
