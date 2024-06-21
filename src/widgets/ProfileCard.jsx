import React, { useState, useEffect } from 'react';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

const ProfileCard = ({ userId }) => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) {
        console.error("No userId provided");
        return;
      }

      try {
        const userDocRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserDetails(userDoc.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!userDetails) {
    return <div className='loading-card'>Loading...</div>;
  }

  return (
    <div className='profile-card'>
      <img src={userDetails.photoURL} alt={`${userDetails.firstName}'s profile`} />
      <div className='profile-card-details'>
        <h3>{userDetails.firstName} {userDetails.lastName}</h3>
        <div>
          <p><span><WorkIcon /></span>{userDetails.accountType}</p>
          <p><span><PlaceIcon /></span>{userDetails.location}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

