import React from 'react'
import { formatPrice } from '../../utils/formatPrice';
import { Link } from 'react-router-dom';

const DebtsTable = ({ debts }) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Ismi</th>
                    <th>Umumiy hisob</th>
                    <th>To'langan</th>
                    <th>To'lash kerak</th>
                    <th>Qachon</th>
                    <th>Boshqa</th>
                </tr>
            </thead>

            <tbody>

                {
                    debts.map((debt, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>Salim aka</td>
                            <td>
                                <span className="text-success">
                                    {formatPrice(debt.total_amount)}
                                </span>  - so'm
                            </td>
                            <td>
                                <span className="text-success">
                                    {formatPrice(debt.paid_amount)}
                                </span>  - so'm
                            </td>
                            <td>
                                <span className="text-danger">
                                    {formatPrice(debt.due_amount)}
                                </span>  - so'm
                            </td>
                            <td>
                                22.02.2026
                            </td>
                            <td>
                                <Link to={`/payment/${debt.sale_id}`} className="my-btn-success btn-sm">
                                    To'lov
                                </Link>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}

export default DebtsTable