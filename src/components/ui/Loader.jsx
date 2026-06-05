import React from 'react'

const Loader = () => {
    return (
        <div className="d-flex justify-content-center py-2">
            <div className="text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <div>Loading...</div>
            </div>
        </div>
    )
}

export default Loader