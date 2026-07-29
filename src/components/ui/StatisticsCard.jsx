import React from 'react'

const StatisticsCard = ({ count, text }) => {
  return (
    <div className='col-lg-3 ccol-md-4 col-sm-6'>
        <div className="card shadow-sm mt-4">
            <div className="card-body text-center">
                <h2 className='fw-semibold'>{count}</h2>
                <p>{text}</p>
            </div>
        </div>
    </div>
  )
}

export default StatisticsCard