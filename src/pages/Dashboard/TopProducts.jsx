import React from 'react';
import { getUnitBadge } from "../../utils/getUnitBadge";
import { formatPrice } from '../../utils/formatPrice';
import { formatStock } from '../../utils/formatStock';

const TopProducts = ({ products }) => {
    return (
        <div className="card shadow-sm mt-5" id='top'>
            <div className="card-header bg-white">
                <h5 className="mb-0 fw-semibold">Top sotilgan maxsulotlar</h5>
            </div>

            <div className="card-body">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Mahsulot</th>
                            <th>Miqdori</th>
                            <th>Keltirgan pul</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{product.product_name}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <span className='fw-semibold'>
                                            { formatStock(product.unit, product.total_quantity)}
                                        </span>
                                        <span>: {getUnitBadge(product.unit).content}</span>
                                        
                                    </div>
                                </td>
                                <td>
                                    <span className="text-success">
                                        {formatPrice(product.total_sales)}
                                    </span> - so'm
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};

export default TopProducts;