import React from 'react';
import WorkIcon from '@mui/icons-material/Work';
import PlaceIcon from '@mui/icons-material/Place';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

const UserProfileCard = ({ user }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const currentUserId = auth.currentUser ? auth.currentUser.uid : null;

  const handleConnect = async () => {
    if (!currentUserId) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const currentUserDocRef = doc(db, 'users', currentUserId);
      await updateDoc(currentUserDocRef, {
        connections: arrayUnion(user.id)
      });
      alert(`You have connected with ${user.firstName}`);
    } catch (error) {
      console.error("Error updating connections:", error);
    }
  };

  const handleNavigate = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <div className='profile-card'>
      <img src={user.photoURL} alt={`${user.firstName}'s profile`} />
      <div className='profile-card-details'>
        <h3 onClick={handleNavigate} style={{ cursor: 'pointer', color: 'blue' }}>
          {user.firstName} {user.lastName}
        </h3>
        <div>
          <p><span><WorkIcon /></span>{user.accountType}</p>
          <p><span><PlaceIcon /></span>{user.location}</p>
        </div>
        
      </div>

      <div className='btn-container'>
        <button onClick={handleConnect} className='connect-btn'>Connect</button>
        </div>
    </div>
  );
}

export default UserProfileCard;
