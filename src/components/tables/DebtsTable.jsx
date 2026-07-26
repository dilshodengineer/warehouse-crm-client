import React from 'react'
import { formatPrice } from '../../utils/formatPrice';
import { formatDate } from '../../utils/formatDateTime';
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
                            <td>{debt.sale.customer}</td>
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
                                {formatDate(debt.created_at)}
                            </td>
                            <td>
                                <div className="d-flex gap-4 align-items-center">
                                    <small>
                                        <Link to={`/sales/history/${debt.sale_id}`} className="text-secondary">
                                            Batafsil <i className="bi bi-box-arrow-up-right"></i>
                                        </Link>
                                    </small>

                                    <Link
                                        to={`/payment/${debt.sale_id}`}
                                        state={{ debt: debt }}
                                        className="my-btn-success d-inline-block text-decoration-none">
                                        To'lov qilish
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))
                }

            </tbody>
        </table>
    )
}

export default DebtsTable