import React from 'react'
import TransactionForm from '../../components/forms/TransactionForm'

const AddTransaction = () => {
    return (
        <div className='container-fluid bg-white rounded-3 border shadow-sm p-3 pb-5'>
            <h3>Tushum yoki chiqim kiritish</h3>
            <div className="border-top mt-2 mb-4"></div>

            <TransactionForm />
        </div>
    )
}

export default AddTransaction