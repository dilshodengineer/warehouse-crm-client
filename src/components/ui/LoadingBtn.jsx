import React from 'react'

const LoadingBtn = ({isLoading, content}) => {
    return (
        <button
            className="btn btn-dark px-5"
            type="submit"
            disabled={isLoading}
        >

            {
                isLoading
                    ?
                    <>
                        Kuting <span className="spinner-border spinner-border-sm me-2"></span>
                    </> 
                    :
                    content
            }
        </button>
    )
}

export default LoadingBtn