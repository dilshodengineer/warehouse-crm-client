import React from 'react'

const pageWindow = ({ children }) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="border rounded-3 shadow-sm p-3 bg-white">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default pageWindow