import React, { useState, useEffect } from 'react';
import ProfileCard from '../../widgets/ProfileCard';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase';

const ConnectionDetails = ({ userId }) => {
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    const fetchConnection = async (Id) => {
      if (typeof Id !== 'string') {
        console.error("Invalid userId:", Id);
        return;
      }

      try {
        const userDocRef = doc(db, 'users', Id);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setConnections(userData.connections || []);
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    if (userId) {
      fetchConnection(userId);
    }
  }, [userId]);

  console.log(connections);

  return (
    <div className='profile-details-card'>
      <h1>My Connections</h1>
      {connections.length > 0 ? (
        connections.map((connection, index) => (
          <ProfileCard key={index} userId={connection} />
        ))
      ) : (
        <p>No Connections found</p>
      )}
    </div>
  );
}

export default ConnectionDetails;


