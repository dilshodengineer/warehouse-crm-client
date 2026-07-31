import React from 'react'
import { formatPrice } from "../../utils/formatPrice";

const StatisticsCard = ({ title, unit, count }) => {
    return (
        <div className='col-lg-3 ccol-md-4 col-sm-6'>
            <div className="card shadow-s mt-4">
                <div className="card-body text-center">
                    <div
                        className="
                        d-flex justify-content-center 
                        align-items-center gap-2 
                        border-bottom mb-2 pb-2
                        ">
                        <h3 className='fw-semibol m-0'>
                            {formatPrice(count)}
                        </h3>
                        <p className="text-success m-0">{unit}</p>
                    </div>
                    <p>{title}</p>
                </div>
            </div>
        </div>
    )
}

export default StatisticsCard;