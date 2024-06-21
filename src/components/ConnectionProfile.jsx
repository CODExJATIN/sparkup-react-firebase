import React from 'react';
import './ProfilePage.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

const UserProfilePage = () => {

    const userId = useParams().userId;
    console.log(userId);

    const [user,setUser]= useState(null);

    useEffect(() => {
        const fetchUser = async () => {
          const userDocRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            console.error("No such user!");
          }
        };
    
        fetchUser();
      }, []);

      console.log(user)

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img src={user.photoURL} alt="Profile" className="profile-photo" />
                <div className="profile-info">
                    <h1>{`${user.firstName} ${user.lastName}`}</h1>
                    <p>{user.location}</p>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
            </div>
            <div className="profile-body">
                <section className="investment-preferences">
                    <h2>Investment Preferences</h2>
                    <p><strong>Interested In:</strong> {user.interestedIn?.join(', ')}</p>
                    <p><strong>Investment Range:</strong> ${user.investmentRange[0]} - ${user.investmentRange[1]}</p>
                </section>
                <section className="previous-investments">
                    <h2>Previous Investments</h2>
                    {(user.previouslyInvested?.length > 0 && user.previouslyInvested[0]?.name===" ") ? (
                        <ul>
                            {user.previouslyInvested.map((investment, index) => (
                                <li key={index}>
                                    <p><strong>Name:</strong> {investment.name}</p>
                                    <p><strong>Type:</strong> {investment.type}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No previous investments listed.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default UserProfilePage;
