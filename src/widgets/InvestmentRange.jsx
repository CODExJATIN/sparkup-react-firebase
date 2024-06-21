import React from 'react'

const InvestmentRange = ({min,max}) => {
  return (
    <div className='investment-range'>
      <h1>Investment Range</h1>
      <p>{min}₹ - {max}₹</p>
    </div>
  )
}

export default InvestmentRange
