import React from 'react';
import './ProfilePage.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

const UserProfilePage = () => {

    const userId = useParams().userId;
    console.log(userId);

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

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
      }, [userId]);

      //console.log(user)

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
                    <p>{user.accountType}</p>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                </div>
            </div>
            <div className="profile-body">
                {user.accountType === 'startup' ? (
                    <section className="startup-details">
                        <h2>Startup Details</h2>
                        <p><strong>Startup Name:</strong> {user.startupName}</p>
                        <p><strong>Description:</strong> {user.description}</p>
                        <p><strong>Type:</strong> {user.type}</p>
                        <p><strong>Employees:</strong> {user.employees}</p>
                        <p><strong>Investment Amount:</strong> ${user.investmentAmount[0]} - ${user.investmentAmount[1]}</p>
                        <br/>
                        <h3>Key People</h3>
                        {user.keyPeople?.length > 0 && user.keyPeople[0].name===" " ? (
                            <ul>
                                {user.keyPeople.map((person, index) => (
                                    <li key={index}>
                                        <p><strong>Name:</strong> {person.name}</p>
                                        <p><strong>Position:</strong> {person.position}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No key people listed.</p>
                        )}

                       <button className="go-back-button" onClick={() => navigate('/') }>
                        Go Back
                       </button>
                    </section>
                ) : (
                    <>
                    <section className="investment-preferences">
                        <h2>Investment Preferences</h2>
                        <p><strong>Interested In:</strong> {user.interestedIn?.join(', ')}</p>
                        <p><strong>Investment Range:</strong> ${user.investmentRange[0]} - ${user.investmentRange[1]}</p>
                    </section>
                    <section className="previous-investments">
                        <h2>Previous Investments</h2>
                        {user.previouslyInvested?.length > 0 && user.previouslyInvested[0].name===" " ? (
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
                    <button className="go-back-button" onClick={() => navigate('/') }>
                    Go Back
                    </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;

