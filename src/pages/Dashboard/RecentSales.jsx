import React from 'react';
import { formatDateTime } from "../../utils/formatDateTime";
import { formatPrice } from '../../utils/formatPrice';
import PaymentStatus from '../../components/ui/payment-status/PaymentStatus';
import { Link } from 'react-router-dom';

const RecentSales = ({ recentSales }) => {
    return (
        <div className='card mt-5 shadow-sm'>
            <div className="card-header bg-white">
                <h5 className='mb-0 fw-semibold'>Oxirgi 10 ta savdo</h5>
            </div>

            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Haridor</th>
                            <th>Qachon</th>
                            <th>Umumiy narx</th>
                            <th>To'lov status</th>
                            <th>Boshqa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recentSales.map((sale, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{sale.customer}</td>
                                    <td>{formatDateTime(sale.created_at)}</td>
                                    <td>
                                        <span className='text-success'>
                                            {formatPrice(sale.total_amount)}
                                        </span> - so'm
                                    </td>
                                    <td>
                                        <PaymentStatus status={sale.payment_status} />
                                    </td>
                                    <td>
                                        <Link to={`/sales/history/${sale.id}`} className='small text-secondary'>
                                            Batafsil <i className="bi bi-box-arrow-up-right"></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default RecentSales