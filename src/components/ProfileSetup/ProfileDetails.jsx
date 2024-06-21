import React from 'react'
import About from '../../widgets/About'
import InvestmentRange from '../../widgets/InvestmentRange'
import InterestedIn from '../../widgets/InterestedIn'

const ProfileDetails = ({about,min,max,types}) => {

  return (
    <div className='profile-details-card'>
            <About about={about}/>
            <InvestmentRange min={min} max={max}/>
            <InterestedIn types={types}/>
    </div>
  )
}

export default ProfileDetails
