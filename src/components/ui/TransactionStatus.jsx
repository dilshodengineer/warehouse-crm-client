import React from 'react'

const TransactionStatus = ({ type }) => {
    if (type === 'expense') {
        return (
            <span className="d-inline-block bg-danger border-danger border bg-opacity-25 rounded-4 py-1 px-3 text-danger small">
                Chiqim <i className="bi bi-upload"></i>
            </span>
        )
    } else {
        return (
            <span className="d-inline-block bg-success border border-success bg-opacity-25 rounded-4 py-1 px-3 text-success small">
                Tushum <i className="bi bi-download"></i>
            </span>
        )
    }
}

export default TransactionStatus