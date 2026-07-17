import React from 'react'
import TransactionTable from '../../components/tables/TransactionTable'

const Transactions = () => {
  return (
    <div className='container-fluid bg-white rounded-3 border shadow-sm p-3 pb-5'>
        <h3>Kirim va chiqim</h3>
        <div className="border-bottom my-2"></div>

        <TransactionTable/>
    </div>
  )
}

export default Transactions