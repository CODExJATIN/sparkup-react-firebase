import React from 'react'

const InterestedIn = ({types}) => {



  return (
    <div className='interested-in'>
    <h1>Interested In</h1>
    <p>Investor is interested to invest in given type of startups</p>
    <h2>Investment Preferences</h2>
    <div>
    
    <p><strong>Interested In:</strong> {types.join(', ')}</p>
    </div>
    </div>
    
  )
}

export default InterestedIn
