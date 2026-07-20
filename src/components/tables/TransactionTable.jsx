import React from 'react'
import TransactionStatus from '../ui/TransactionStatus'
import { formatDate } from '../../utils/formatDate'
import { formatPrice } from '../../utils/formatPrice'

const TransactionTable = ({ transactions }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Kimga / Qayerga</th>
                    <th>Status</th>
                    <th>Izoh</th>
                    <th>Miqdori</th>
                    <th>Qachon</th>
                </tr>
            </thead>

            <tbody>

                {
                    transactions.map((cash, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{cash.title}</td>
                            <td>
                                <TransactionStatus type={cash.type} />
                            </td>
                            <td>{cash.description}</td>
                            <td>
                                <div className="d-flex gap-1">
                                    <span className="text-success">
                                        {formatPrice(cash.amount)}
                                    </span>
                                    <span>
                                        - so'm
                                    </span>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex gap-3">
                                    <span>
                                        {formatDate(cash.created_at)}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}

export default TransactionTable