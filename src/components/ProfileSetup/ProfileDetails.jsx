import React from 'react'
import About from '../../widgets/About'
import InvestmentRange from '../../widgets/InvestmentRange'
import InterestedIn from '../../widgets/InterestedIn'
import StartupWidget from '../../widgets/StartupWidget'

const ProfileDetails = ({userData}) => {



  return (
    <div className='profile-details-card'>
     
     
      {
        userData.accountType === 'startup' ? <StartupWidget userData={userData}/> :
        (<>
        <About about={userData.about}/>
        <InvestmentRange min={userData.investmentRange[0]} max={userData.investmentRange[1]}/>
        <InterestedIn types={userData.interestedIn}/> 
        </>)
      }
      
            
    </div>
  )
}

export default ProfileDetails
