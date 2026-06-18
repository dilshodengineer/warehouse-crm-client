import React from 'react'

const StockUnitBadges = ({ classSyles }) => {
    return (
        <div className={`d-flex gap-2 ${classSyles}`}>
            <b>O'lchovlar:</b>
            <div className="d-flex align-items-center gap-2">
                <span className="small d-inline-block px-2 py-0 border border-success bg-success text-success bg-opacity-25 rounded-4">kg</span>
                <span className="small d-inline-block px-2 py-0 border border-warning bg-warning text-warning bg-opacity-25 rounded-4">dona</span>
                <span className="small d-inline-block px-2 py-0 border border-info bg-info text-info bg-opacity-25 rounded-4">litr</span>
            </div>
        </div>
    )
}

export default StockUnitBadges