import React from 'react'

const StartupWidget = ({userData}) => {

  
  return (
    <div className='startup-widget'>
    <h1>{userData.startupName}</h1>
     <div>
        <p><strong>Startup Type: </strong>{userData.type}</p>
    </div>
      <div className='about-widget'>
        <h2>About</h2>
        <p>{userData.description}</p>
      </div>

      <div className='investment-range'>
        <h2>Expected InvestmentRange</h2>
        <p>{userData.investmentAmount[0]} - {userData.investmentAmount[1]}</p>
      </div>

      <div className='about-widget'>
        <h2>No. of Employees</h2>
        <p>{userData.employees}</p>
      </div>

      
    </div>
  )
}

export default StartupWidget
